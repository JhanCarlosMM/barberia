// controllers/haircutsController.js
const db = require('../database/db_conect');

exports.getHaircuts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, duracion_minutos FROM tipos_corte');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
