from flask import Flask, request, render_template, jsonify
app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    return render_template("index.html")

@app.route('/api/pricing.json', methods=['POST','GET'])
def pricing():
    request_json = request.get_json()

    engine = [
        {"name": "Gold Engine", "body": 200},
        {"name": "Platinum Engine", "body": 400},
        {"name": "Diamond Engine", "body": 600},
    ]
    wheel = [
        {"name": "Copper Wheel", "body": 50},
        {"name": "Gold Wheel", "body": 60},
        {"name": "Platinum Wheel", "body": 80},
    ]
    window = [
        {"name": "Clear Window", "body": 120},
        {"name": "Grey Window", "body": 160},
        {"name": "Black Window", "body": 200},
    ]

    part = [

        ]

    total = 0;
    for x in engine:
        if x["name"] == request_json["engine"]:
            total = total + x["body"]
            part.append(x);
    for x in wheel:
        if x["name"] == request_json["wheel"]:
            total = total + x["body"]
            part.append(x);
    for x in window:
        if x["name"] == request_json["windows"]:
            total = total + x["body"]
            part.append(x);
    api_response = { "total": total, "part": part }

    return jsonify(api_response)

if __name__ == '__main__':
    app.run()







