INSERT INTO "users" (name, surname, email, password, role, token)
VALUES
  ('Mario', 'Rossi', 'mario.rossi@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'user', 1000),
  ('Lucia', 'Bianchi', 'lucia.bianchi@example.com', '713bfda78870bf9d1b261f565286f85e97ee614efe5f0faf7c34e7ca4f65baca', 'admin', 0), 
  ('Al', 'Verde', 'al.verde@example.com', '5317c27dd731d33f4bfe6a50fc5e3f54c3150b888939b23563ec907dcf28f2e7', 'operator', 0);
/*
user psw = password123
admin psw = adminpass
Al verde psw = senzatoken

*/
INSERT INTO resources (name, description) 
VALUES
  ('GPU_A100', 'NVIDIA A100 Tensor Core GPU, high performance for AI and HPC workloads'),
  ('GPU_RTX', 'NVIDIA GeForce RTX 4090, top-tier gaming and AI acceleration'),
  ('GPU_V100', 'NVIDIA Tesla V100, designed for data centers and deep learning'),
  ('CPU-EPYC', 'AMD EPYC 7742, 64-core server processor optimized for parallel workloads');

INSERT INTO calendars (resource_id, start_time, end_time, cost_per_hour,title)
VALUES
  (3,'2025-09-22T10:00:00Z','2026-09-22T10:00:00Z',10,'calendario infinito'),
  (2,'2025-09-22T10:00:00Z','2026-09-22T10:00:00Z',10,'calendario infinito2'),
  (4,'2025-09-22T10:00:00Z','2026-09-22T10:00:00Z',10,'calendario infinito2');

INSERT INTO requests (calendar_id, user_id, start_time, end_time, title, reason, handled_by, status) VALUES
(3, 1, '2025-10-25 10:00:00', '2025-10-25 11:00:00', 'Prenotazione Sala Riunioni', 'Riunione settimanale team', NULL, 'pending'),
(3, 2, '2025-10-25 11:00:00', '2025-10-25 12:00:00', 'Colloquio candidato', 'Intervista HR', 2, 'approved'),
(3, 3, '2025-10-25 14:00:00', '2025-10-25 15:00:00', 'Formazione', 'Corso obbligatorio', 2, 'approved'),
(3, 1, '2026-04-26 09:00:00', '2026-04-26 10:00:00', 'Workshop', 'Cambio programma', 2, 'cancelled'),
(3, 2, '2026-04-26 10:00:00', '2026-04-26 11:00:00', 'Team Meeting', 'Allineamento progetto', 2, 'approved'),
(3, 3, '2026-05-26 13:00:00', '2026-05-26 14:00:00', 'Client Call', 'Chiamata con cliente', 2, 'approved');