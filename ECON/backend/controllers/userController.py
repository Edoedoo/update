from flask import Blueprint, request, jsonify, current_app, g
import models.userModel as userModel
# import jwt
# import datetime
# from middleware.middlewareRoute import token_required

userBp = Blueprint('userBp', __name__)
SECRET_KEY = "ec3000**Screamouse"



        # DROPDOWN NAVBAR FRONTEND (KATEGORI DAN SUBKATEGORI)
@userBp.route('/listKategori', methods=['GET'])
def getLIstKategor():
    data =  userModel.listKategori()
    if data is None:
        return jsonify({'error', 'Gagal mengambil data list Kategori...'}), 500
    return jsonify(data)

@userBp.route('/listSubKategori', methods=['GET'])
def getListSubKategor():
    data = userModel.listSubKategori()
    if data is None :
        return jsonify({'error': 'Gagal mengambil data list SubKategori...'}), 500
    return jsonify(data)

        # SEMUA PRODUK
@userBp.route('/semuaProduk', methods=['GET'])
def getAllProduct():
    try:
        lowerprice = request.args.get("lowerprice", type=str)
        toprate = request.args.get("toprate", type=str)
        kategoriid = request.args.get("kategoriid", type=int)
        subkategoriid = request.args.get("subkategoriid", type=int)
        page = request.args.get("page", default=1, type=int)
        limit = 100

        data = userModel.allProduct( page, kategoriid, subkategoriid, toprate, lowerprice, limit)
        if data is None:
            return jsonify({'error': 'Gagal mensgambil data list Produk...'}), 500
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



        # PRODUK REKOMENDASI=
@userBp.route('/listProdukRekomendasi', methods=['GET'])
def getProdukRekomendasi():
    try:
        limit = 100
        page = int(request.args.get("page", default=1))

        data = userModel.listProdukRekomendasi(limit, page)

        if data is None:
            return jsonify({'error': 'Gagal mengambil data list Produk Rekomendasi...'}), 500

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

        # PODUK BERDASARKAN HARGA TERMURAH
@userBp.route('/listProdukHargaTermurah', methods=['GET'])
def getProdukByLowPrice():
    try:
        limit = 100
        page = int(request.args.get("page", default=1))

        data = userModel.listProdukByLowPrice(limit, page)

        if data is None:
            return jsonify({'error': 'Gagal mengambil data list Produk Termurah...'}), 500

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

        # GAMBAR PRODUK
@userBp.route('/listGambarProduk', methods=['GET'])
def getGambarProduk():
    data = userModel.listGambarProduk()
    if data is None:
        return jsonify({'error': 'Gagal mengambil data Gambar Produk...'}), 500
    return jsonify(data)
    
@userBp.route('/listNamaProduk', methods=['GET'])
def getListNameProduk ():
    data = userModel.listNamaProduk()
    if data is None:
        return jsonify({'error': 'Gagal mengambil data nama Produk...'}), 500
    return jsonify(data)



# @userBp.route('/login', methods=['POST'])
# def loginUser():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#     user = userModel.loginUser(username, password)
    
#     if user:
#         payload = {
#             'id': user['id'],
#             'username': user['username'],
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
#         }
#         token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

#         return jsonify({
#             'message': f"astronaut siap, pakai helm mu {user['username']}!",
#             'success': True,
#             'id': user['id'],
#             'email': user['email'],
#             'username': user['username'],
#             'token': token
#         })
#     else:
#         return jsonify({
#             'message': 'nama atau token salah',
#             'success': False
#         })

# @userBp.route('/profile', methods=['GET'])
# @token_required
# def getProfile():
#     user_data = g.user
#     return jsonify({
#         'message': 'Data user berhasil diambil',
#         'user': user_data
#     })




@userBp.route('/users', methods=['POST'])
def addUser():
    data = request.get_json()
    userModel.addUser(data['name'], data['user'])
    return jsonify({'message': 'User added'})


@userBp.route('/users/<int:id>', methods=['PUT'])
def updateUser(id):
    data = request.get_json()
    userModel.updateUser(id, data['name'], data['user'])
    return jsonify({'message': 'User updated'})

@userBp.route('/users/<int:id>', methods=['DELETE'])
def deleteUser(id):
    userModel.deleteUser(id)
    return jsonify({'message': 'User deleted'})
