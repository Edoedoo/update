from flask import Flask
from controllers.userController import userBp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(userBp)
CORS(app)
app.config['SECRET_KEY'] = ''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


