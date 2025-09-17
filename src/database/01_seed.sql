INSERT INTO "users" (name, surname, email, password, role, token)
VALUES
  ('Mario', 'Rossi', 'mario.rossi@example.com', 'password123', 'user', 1000),
  ('Lucia', 'Bianchi', 'lucia.bianchi@example.com', 'adminpass', 'admin', 0),
  ('Giovanni', 'Verdi', 'giovanni.verdi@example.com', 'operatorpass', 'operator', 0);

INSERT INTO resources (name, description) 
VALUES
  ('GPU_A100', 'NVIDIA A100 Tensor Core GPU, high performance for AI and HPC workloads'),
  ('GPU_RTX', 'NVIDIA GeForce RTX 4090, top-tier gaming and AI acceleration'),
  ('GPU_V100', 'NVIDIA Tesla V100, designed for data centers and deep learning'),
  ('CPU-EPYC', 'AMD EPYC 7742, 64-core server processor optimized for parallel workloads');