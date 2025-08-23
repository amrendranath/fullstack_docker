from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB configuration
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["user_submission_db"]
collection = db["users"]

@app.route('/')
def home():
    return jsonify({
        "message": "Flask Backend API",
        "status": "running",
        "endpoints": {
            "/api": "GET - Get all submissions",
            "/submit": "POST - Submit new data",
            "/health": "GET - Health check"
        }
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "OK",
        "service": "backend",
        "database": "connected" if client.admin.command('ping') else "disconnected",
        "timestamp": str(os.environ.get('TIMESTAMP', 'N/A'))
    })

@app.route('/api', methods=['GET'])
def get_all_submissions():
    try:
        submissions = list(collection.find({}, {'_id': 0}))
        return jsonify(submissions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Handle both form data and JSON data
        if request.is_json:
            data = request.get_json()
            name = data.get('name')
            email = data.get('email')
        else:
            name = request.form.get('name')
            email = request.form.get('email')

        if not name or not email:
            return jsonify({"error": "Both name and email are required"}), 400

        # Insert into MongoDB
        result = collection.insert_one({"name": name, "email": email})
        
        return jsonify({
            "message": "Data submitted successfully",
            "id": str(result.inserted_id),
            "data": {"name": name, "email": email}
        }), 200

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@app.route('/api/count', methods=['GET'])
def get_submission_count():
    try:
        count = collection.count_documents({})
        return jsonify({"count": count})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
