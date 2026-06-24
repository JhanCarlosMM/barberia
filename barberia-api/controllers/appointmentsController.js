// controllers/appointmentsController.js
const db = require('../database/db_conect');

exports.createAppointment = async (req, res) => {
  try {
    const { barbero_id, tipo_corte_id, inicio_time } = req.body;
    const usuario_id = req.user.id;

    // Obtener duración del corte
    const [corte] = await db.query('SELECT duracion_minutos FROM tipos_corte WHERE id = ?', [tipo_corte_id]);
    if (corte.length === 0) return res.status(400).json({ error: 'Tipo de corte inválido' });
    const duracion = corte[0].duracion_minutos;

    const inicio = new Date(inicio_time);
    const fin = new Date(inicio.getTime() + duracion * 60000);

    // Verificar que el barbero esté disponible (no solapamiento)
    const [conflict] = await db.query(
      `SELECT id FROM citas 
       WHERE barbero_id = ? AND inicio_time < ? AND fin_time > ?`,
      [barbero_id, fin, inicio]
    );
    if (conflict.length > 0) {
      return res.status(409).json({ error: 'El barbero ya tiene una cita en ese horario.' });
    }

    // Insertar cita
    const [result] = await db.query(
      `INSERT INTO citas (usuario_id, barbero_id, tipo_corte_id, inicio_time, fin_time)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, barbero_id, tipo_corte_id, inicio, fin]
    );

    res.status(201).json({ message: 'Cita guardada', appointmentId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    
    console.log(`[APPOINTMENTS] Obteniendo citas para usuario ${usuario_id}`);
    
    const [citas] = await db.query(
      `SELECT 
        c.id,
        c.inicio_time,
        c.fin_time,
        b.nombre as barbero_nombre,
        tc.nombre as tipo_corte,
        tc.duracion_minutos
       FROM citas c
       INNER JOIN barberos b ON c.barbero_id = b.id
       INNER JOIN tipos_corte tc ON c.tipo_corte_id = tc.id
       WHERE c.usuario_id = ?
       ORDER BY c.inicio_time DESC`,
      [usuario_id]
    );
    
    console.log(`[APPOINTMENTS] ✅ Se encontraron ${citas.length} citas`);
    res.json({ citas });
  } catch (error) {
    console.error('[APPOINTMENTS] ❌ Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};