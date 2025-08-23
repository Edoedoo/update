SHOW DATABASES;                 -- Melihat semua database
CREATE DATABASE nama_db;       -- Membuat database
USE nama_db;                   -- Masuk/memilih database
DROP DATABASE nama_db;         -- Menghapus database

SHOW TABLES;                     -- Menampilkan semua tabel di database aktif
CREATE TABLE nama_tabel (...);   -- Membuat tabel
DESCRIBE nama_tabel;             -- Menampilkan struktur tabel
DROP TABLE nama_tabel;           -- Menghapus tabel

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100)
  FOREIGN KEY (user_id) REFERENCES users(id)  -> jika saling berhubungan
);

-- CREATE (Insert)
INSERT INTO users (username, password) VALUES ('edo', 'rahasia');
-- READ (Select)
SELECT * FROM users;
SELECT username FROM users WHERE id = 1;
-- UPDATE
UPDATE users SET password='baru' WHERE username='edo';
-- DELETE
DELETE FROM users WHERE id = 1;

ALTER TABLE users ADD email VARCHAR(100);      -- Tambah kolom
ALTER TABLE users DROP COLUMN email;           -- Hapus kolom
ALTER TABLE users MODIFY username TEXT;        -- Ubah tipe kolom
RENAME TABLE users TO akun;                    -- Ganti nama tabel

CREATE USER 'admin'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

mysqldump -u root -p nama_db > backup.sql     # Ekspor
mysql -u root -p nama_db < backup.sql         # Impor

        