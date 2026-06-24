const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const barbersRoutes = require('./routes/barbers');
const haircutsRoutes = require('./routes/haircuts');
const availabilityRoutes = require('./routes/availability');
const appointmentsRoutes = require('./routes/appointments');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/barbers', barbersRoutes);
app.use('/api/haircuts', haircutsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});