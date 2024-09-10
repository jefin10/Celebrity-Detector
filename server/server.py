from flask import Flask, request, jsonify, render_template
import util
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/classify_image', methods=['POST'])
def classify_image():
    try:
        image_data = request.form['image_data']
        print(f"Received image data (first 100 chars): {image_data[:100]}")
        
        result = util.classify_image(image_data)
        response = jsonify(result)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        print(f"Error in classify_image: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Current working directory:", os.getcwd())
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    util.load_saved_artifacts()
    app.run(port=5000, debug=True)