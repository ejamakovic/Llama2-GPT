from flask import Flask, render_template, request
from llama_cpp import Llama
import re

chat = "" 

llm = Llama(model_path="./models/llama-2-7b-chat.bin", verbose=True, n_ctx=4096)

app = Flask(__name__)

@app.route("/")
def index():
    global llm
    print("Loading model...")
    llm = Llama(model_path="./models/llama-2-7b-chat.bin", verbose=True, n_ctx=4096)
    print("Model loaded.")
    return render_template("index.html")

@app.route("/pitanje", methods=["POST"])
def pitanje():
    global chat
    pitanje = request.form.get("pitanje")
    # Za što duži odgovor staviti max_tokens=0
    odgovor = llm(chat + "Q: " + pitanje + " A: ", max_tokens=0, stop=["Q"], echo=True)
    odgovor = re.split("A:", odgovor["choices"][0]["text"])[1]
    chat = chat + "Question: " + pitanje + "Answer: " + odgovor
    return odgovor

@app.route("/model", methods=["POST"])
def model():
    global llm
    model = request.form.get("model")
    print("Loading model...")
    if model=="7B":
        llm = Llama(model_path="./models/llama-2-7b-chat.bin", verbose=True, n_ctx=4096)
    else:
        llm = Llama(model_path="./models/llama-2-13b-chat.bin", verbose=True, n_ctx=4096)
    print("Model changed.")
    return "Model uspješno promjenjen"


@app.route("/izbrisiChat", methods= ["POST"])
def izbrisi():
    global chat
    chat = ""
    return "Izbrisan prethondi chat"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port = 8080, debug = True)
