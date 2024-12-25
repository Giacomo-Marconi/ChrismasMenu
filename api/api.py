from flask import Flask, request, jsonify
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
FILE = './api/data.json'

@app.route('/api/getSection', methods=['GET'])
def get_section():
    with open(FILE) as f:
        data = json.load(f)['menu']
    
    section = []
    for s in data:
        section.append(s['name'])
    return jsonify(section)

@app.route('/api/getMenu', methods=['GET'])
def getMenu():
    with open(FILE) as f:
        data = json.load(f)['menu']
    return jsonify(data)

@app.route('/api/addItem', methods=['POST'])
def add_item():
    data = request.get_json()
    print(data)
    section = data['section']
    item = data['item']
    
    with open(FILE) as f:
        data = json.load(f)['menu']
    
    for s in data:
        if s['name'] == section:
            s['items'].append(item)
            
            with open(FILE, 'w') as f:
                json.dump({'menu': data}, f)
            
            return jsonify({'message': 'Item added successfully'}), 200
    return jsonify({'message': 'Section not found'}), 404


@app.route('/api/deleteItem', methods=['DELETE'])
def delete_item():
    section = request.get_json()['section']
    item = request.get_json()['item']
    
    with open(FILE) as f:
        data = json.load(f)['menu']
        
    for s in data:
        if s['name'] == section:
            for i in s['items']:
                if i == item:
                    s['items'].remove(i)
                    
                    with open(FILE, 'w') as f:
                        json.dump({'menu': data}, f)
                    
                    
                    return jsonify({'message': 'Item deleted successfully'}), 200
                
    return jsonify({'message': 'Item not found'}), 404


@app.route('/api/addSection', methods=['POST'])
def add_section():
    section = request.get_json()['section']
    
    with open(FILE) as f:
        data = json.load(f)['menu']

    for s in data:
        if s['name'] == section:
            return jsonify({'message': 'Section already exists'}), 400
    data.append({'name': section, 'items': []})
    
    with open(FILE, 'w') as f:
        json.dump({'menu': data}, f)
    
    return jsonify({'message': 'Section added successfully'}), 200


@app.route('/api/deleteSection', methods=['DELETE'])
def delete_section():
    section = request.get_json()['section']
    
    with open(FILE) as f:
        data = json.load(f)['menu']
        
    for s in data:
        if s['name'] == section:
            data.remove(s)
            
            with open(FILE, 'w') as f:
                json.dump({'menu': data}, f)
            
            return jsonify({'message': 'Section deleted successfully'}), 200
    return jsonify({'message': 'Section not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
    
