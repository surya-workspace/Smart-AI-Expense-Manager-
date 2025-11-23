from flask import Flask
from flask_migrate import Migrate
from db import db
from models import *
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env variables

def create_app():
    app = Flask(__name__)

    # Load config values
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("SQLALCHEMY_DATABASE_URI")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize DB
    db.init_app(app)
    Migrate(app, db)

    # Register Blueprints
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return {"message": "Smart Expense Backend Running"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
