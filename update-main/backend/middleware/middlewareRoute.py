# from functools import wraps
# from flask import request, jsonify, g, current_app
# import jwt
# SECRET_KEY = "ec3000**Screamouse"  

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None
#         if 'Authorization' in request.headers:
#             auth_header = request.headers['Authorization']
#             if auth_header.startswith("Bearer "):
#                 token = auth_header[7:]

#         if not token:
#             return jsonify({'message': 'Token tidak ditemukan'}), 401

#         try:
#             data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
#             g.user = data
#         except jwt.ExpiredSignatureError:
#             return jsonify({'message': 'Token expired'}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({'message': 'Token invalid'}), 401

#         return f(*args, **kwargs)
#     return decorated
