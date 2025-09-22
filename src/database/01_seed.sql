INSERT INTO "users" (name, surname, email, password, role, token)
VALUES
  ('Mario', 'Rossi', 'mario.rossi@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'user', 1000),
  ('Lucia', 'Bianchi', 'lucia.bianchi@example.com', '713bfda78870bf9d1b261f565286f85e97ee614efe5f0faf7c34e7ca4f65baca', 'admin', 0), 
  ('Giovanni', 'Verdi', 'giovanni.verdi@example.com', 'operatorpass', 'operator', 0);
/*
user psw = password123
admin psw = adminpass

*/
INSERT INTO resources (name, description) 
VALUES
  ('GPU_A100', 'NVIDIA A100 Tensor Core GPU, high performance for AI and HPC workloads'),
  ('GPU_RTX', 'NVIDIA GeForce RTX 4090, top-tier gaming and AI acceleration'),
  ('GPU_V100', 'NVIDIA Tesla V100, designed for data centers and deep learning'),
  ('CPU-EPYC', 'AMD EPYC 7742, 64-core server processor optimized for parallel workloads');

INSERT INTO calendars (resource_id, start_time, end_time, cost_per_hour,title)
VALUES
  ('3','2025-09-22T10:00:00Z','2026-09-22T10:00:00Z',10,'calendario infinito')