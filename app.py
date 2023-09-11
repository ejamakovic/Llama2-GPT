from flask import Flask, render_template, request
from llama_cpp import Llama
import re


print("Loading model...")
llm = Llama(model_path="./models/llama-2-7b-chat.bin", verbose=True)
print("Model loaded.")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/pitanje", methods=["POST"])
def pitanje():
    pitanje = request.form.get("pitanje")

    # Za što duži odgovor staviti max_tokens=0
    odgovor = llm("Q: " + pitanje  + " A: ", max_tokens=100, stop=["Question:", "Q"], echo=True)
    odgovor = re.split("A:", odgovor["choices"][0]["text"])[1]
    return odgovor

@app.route("/model", methods=["POST"])
def model():
    model = request.form.get("model")
    print("Loading model...")
    if model=="7B":
        llm = Llama(model_path="./models/llama-2-7b-chat.bin", verbose=True)
    else:
        llm = Llama(model_path="./models/llama-2-13b-chat.bin", verbose=True)
    print("Model changed.")
    return "Model uspješno promjenjen"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port = 8080, debug = True)
