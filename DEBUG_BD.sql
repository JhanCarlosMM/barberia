-- DEBUG: Revisar datos en la BD
USE barberia;

-- 1. Ver barberos
SELECT '=== BARBEROS ===' AS info;
SELECT * FROM barberos;

-- 2. Ver tipos de corte
SELECT '=== TIPOS DE CORTE ===' AS info;
SELECT * FROM tipos_corte;

-- 3. Ver citas
SELECT '=== CITAS ===' AS info;
SELECT * FROM citas;

-- 4. Ver usuarios
SELECT '=== USUARIOS ===' AS info;
SELECT id, nombre, email FROM usuarios;

-- 5. Test de horarios disponibles manualmente para barbero_id=1 y fecha=2026-06-23
SELECT '=== TEST: Barbero 1, Fecha 2026-06-23 ===' AS info;
SELECT 
  b.id,
  b.nombre,
  b.hora_inicio,
  b.hora_fin,
  COUNT(c.id) as citas_ese_dia
FROM barberos b
LEFT JOIN citas c ON b.id = c.barbero_id 
  AND DATE(c.inicio_time) = '2026-06-23'
WHERE b.id = 1
GROUP BY b.id, b.nombre, b.hora_inicio, b.hora_fin;

-- 6. Ver citas específicas para ese día
SELECT '=== CITAS PARA 2026-06-23 ===' AS info;
SELECT * FROM citas WHERE DATE(inicio_time) = '2026-06-23';
