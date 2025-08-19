tempat rest api backend & frontend
Blueprint: untuk modularisasi route (misalnya: /users, /products).
request: untuk ambil data dari frontend.
jsonify: untuk mengirim respon ke frontend dalam format JSON.
= request.get_json() → untuk ambil data yang dikirim frontend

.route('/users', methods=['GET'])
.route('/users', methods=['POST'])
.route('/users/<int:user_id>', methods=['PUT'])
.route('/users/<int:user_id>', methods=['DELETE'])

| Fungsi                         | Syntax Wajib                                            |
| ------------------------------ | ------------------------------------------------------- |
| Daftar route (endpoint)        | `@blueprint.route('/url', methods=['GET', 'POST',...])` |
| Ambil data JSON dari frontend  | `data = request.get_json()`                             |
| Kirim data ke frontend         | `return jsonify({...})`                                 |
| Ambil parameter dari URL       | `/<int:id>` dan fungsi `def f(id):`                     |
| Panggil model (akses database) | `model.function_name(...)`                              |



Selalu validasi input request.get_json() sebelum dipakai.
Untuk upload file: gunakan request.files.
Kalau API ini dipakai oleh React/JS dari domain lain, tambahkan CORS middleware:

from flask_cors import CORS
app = Flask(__name__)
CORS(app)