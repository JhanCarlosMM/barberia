// controllers/availabilityController.js
const db = require('../database/db_conect');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { barbero_id, fecha, duracion_minutos } = req.query;
    console.log(`[AVAILABILITY] Solicitud: barbero_id=${barbero_id}, fecha=${fecha}, duracion=${duracion_minutos}`);
    
    if (!barbero_id || !fecha) {
      console.log('[AVAILABILITY] ❌ Faltan parámetros');
      return res.status(400).json({ error: 'Faltan barbero_id o fecha' });
    }

    // Validar que la fecha no sea en el pasado
    const fechaRequested = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaRequested.setHours(0, 0, 0, 0);

    if (fechaRequested < hoy) {
      console.log(`[AVAILABILITY] ❌ Fecha pasada: ${fecha}`);
      return res.status(400).json({ error: 'No puedes reservar en fechas pasadas' });
    }

    const duracion = duracion_minutos ? parseInt(duracion_minutos) : 30; // default

    // 1. Obtener horario laboral del barbero
    const [barbero] = await db.query(
      'SELECT hora_inicio, hora_fin FROM barberos WHERE id = ?',
      [barbero_id]
    );
    if (barbero.length === 0) {
      console.log(`[AVAILABILITY] ❌ Barbero ${barbero_id} no encontrado`);
      return res.status(404).json({ error: 'Barbero no encontrado' });
    }
    console.log(`[AVAILABILITY] ✅ Barbero encontrado:`, barbero[0]);
    console.log(`[AVAILABILITY] ✅ Barbero encontrado:`, barbero[0]);
    const { hora_inicio, hora_fin } = barbero[0];

    // 2. Obtener turnos ocupados para ese barbero y fecha
    const startOfDay = `${fecha} 00:00:00`;
    const endOfDay = `${fecha} 23:59:59`;
    const [occupied] = await db.query(
      `SELECT inicio_time, fin_time FROM citas 
       WHERE barbero_id = ? AND inicio_time BETWEEN ? AND ?`,
      [barbero_id, startOfDay, endOfDay]
    );
    console.log(`[AVAILABILITY] Citas ocupadas en ${fecha}:`, occupied.length);

    // 3. Convertir horarios a minutos para cálculo más preciso
    const [startHour, startMin] = hora_inicio.split(':').map(Number);
    const [endHour, endMin] = hora_fin.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    console.log(`[AVAILABILITY] Horario laboral: ${hora_inicio}-${hora_fin} (${startMinutes}-${endMinutes} minutos)`);
    console.log(`[AVAILABILITY] Duración de corte: ${duracion} minutos`);

    // 4. Generar slots cada 30 minutos
    const slots = [];
    for (let min = startMinutes; min + duracion <= endMinutes; min += 30) {
      const hours = Math.floor(min / 60);
      const mins = min % 60;
      const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
      slots.push(timeStr);
    }
    
    console.log(`[AVAILABILITY] Slots generados: ${slots.length}`, slots);

    // 5. Filtrar slots ocupados y pasados
    const now = new Date();
    const isToday = fechaRequested.getTime() === hoy.getTime();
    
    const available = slots.filter(slot => {
      const [slotHour, slotMin] = slot.split(':').map(Number);
      const slotStartMin = slotHour * 60 + slotMin;
      const slotEndMin = slotStartMin + duracion;
      
      const slotStart = new Date(`${fecha}T${slot}:00`);
      const slotEnd = new Date(slotStart.getTime() + duracion * 60000);
      
      // Si es hoy, filtrar horarios que comienzan antes de ahora
      if (isToday && slotStart < now) {
        console.log(`[AVAILABILITY] ⏰ Slot ${slot} comienza antes de la hora actual (${now.toLocaleTimeString('es-ES')})`);
        return false;
      }
      
      return !occupied.some(occ => {
        const occStart = new Date(occ.inicio_time);
        const occEnd = new Date(occ.fin_time);
        return (slotStart < occEnd && slotEnd > occStart);
      });
    });

    console.log(`[AVAILABILITY] ✅ Slots disponibles: ${available.length}`, available);
    res.json({ fecha, barbero_id, duracion, disponibles: available });
  } catch (error) {
    console.error('[AVAILABILITY] ❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};