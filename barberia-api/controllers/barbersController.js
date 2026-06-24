// controllers/barbersController.js
const db = require('../database/db_conect');

exports.getBarbers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nombre, hora_inicio, hora_fin FROM barberos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};