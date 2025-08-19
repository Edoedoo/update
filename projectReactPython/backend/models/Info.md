tempat backend komunikasi dengan database
.cursor(dictionary=True)  # cursor hasil dict (bukan tuple)

.execute("SELECT * FROM users")
.fetchall() → ambil semua baris hasil query.

.execute("SELECT * FROM users WHERE id = %s", (user_id,))
.fetchone() → Ambil 1 Data Saja

.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", (name, email, user_id))
.execute("DELETE FROM users WHERE id = %s", (user_id,))
.commit() → simpan perubahan di database
%s digunakan sebagai placeholder (bukan format string biasa).
.lastrowid → baris terakhir

# error handling
conn = none
try:
    cur.execute(...)
    conn.commit()
except Exception as e:
    print("Error:", e)
finally:
    if conn:
        conn.close()


| Fungsi         | Syntax Umum                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| Buka koneksi   | `conn = get_connection()`                                                   |
| Buat cursor    | `cur = conn.cursor(dictionary=True)`                                        |
| SELECT         | `cur.execute("SELECT * FROM ...")` + `fetchall()` atau `fetchone()`         |
| INSERT         | `cur.execute("INSERT INTO ... VALUES (%s, %s)", (val1, val2))` + `commit()` |
| UPDATE         | `cur.execute("UPDATE ... SET ... WHERE ...", (...))` + `commit()`           |
| DELETE         | `cur.execute("DELETE FROM ... WHERE ...", (...))` + `commit()`              |
| Last insert ID | `cur.lastrowid`                                                             |
| Tutup koneksi  | `conn.close()`                                                              |

