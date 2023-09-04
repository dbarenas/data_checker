from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Dummy document data for demonstration purposes
documents = ["Doc "+str(i) for i in range(20) ]
current_index = 0

# Function to fetch the next document
def fetch_next_document():
    global current_index
    if current_index < len(documents):
        document = documents[current_index]
        current_index += 1
        return document
    else:
        return "No more documents"

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/api/next-document', methods=['POST'])
def next_document():
    document = fetch_next_document()
    return jsonify({'document': document})

@app.route('/api/swipe-left', methods=['POST'])
def swipe_left():
    # Handle the left swipe action (update database if needed)
    return jsonify({'message': 'Left swipe recorded'})

@app.route('/api/swipe-right', methods=['POST'])
def swipe_right():
    # Handle the right swipe action (update database if needed)
    return jsonify({'message': 'Right swipe recorded'})

if __name__ == '__main__':
    app.run(debug=True)
