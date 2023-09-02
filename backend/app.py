from flask import Flask, request, jsonify, abort  # Import abort
from flask_cors import CORS
import logging  # Import logging
import requests
import textrazor
import openai
from concurrent.futures import ThreadPoolExecutor


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/Shobhank-iiitdwd/BERT_summary"
API_HEADERS = {
    "Authorization": "Bearer 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"
}
razor_API_KEY_2 = "8b939ac6b5065faf71bc7c58eeb38c4fd7e813a1ad5b1251193a5837"

openai.api_key = "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"

import time

def summarize_text(text, retries=3, delay=5):
    payload = {"inputs": text}
    for i in range(retries):
        response = requests.post(HUGGINGFACE_API_URL, headers=API_HEADERS, json=payload)
        if response.status_code == 200:
            try:
                summary = response.json()[0]['summary_text']
                return summary
            except (KeyError, TypeError):
                print("Unexpected API response:", response.json())
                return "Error in summarizing text."
        elif response.status_code == 503:  # Service Unavailable
            print(f"API is unavailable. Retry {i+1}/{retries}. Waiting for {delay} seconds.")
            time.sleep(delay)
        else:
            print(f"API call failed. Status code: {response.status_code}, Error message: {response.text}")
            return "Error in summarizing text."
    return "Max retries reached. Could not summarize text."


def reference_links(text):
    razor_API_KEY = "9224bb6f01f35cb07f2ec8b1c7ca780f397685e30b95d517a3eaeaee"
    textrazor.api_key = razor_API_KEY
    client = textrazor.TextRazor(extractors=["entities", "topics"])
    response = client.analyze(text)
    
    wikipedia_links = []
    for entity in response.entities():
        if entity.wikipedia_link:
            wikipedia_links.append(entity.wikipedia_link)
            
    return wikipedia_links

def extract_topics(text):
    textrazor.api_key = razor_API_KEY_2  # Different API key
    client = textrazor.TextRazor(extractors=["topics"])
    response = client.analyze(text)
    
    topics = []
    for topic in response.topics():
        if topic.score > 0.3:
            topics.append(topic.label)
        
    return topics

@app.route('/expand_note', methods=['POST'])
def expand_note():  # Removed 'text' parameter
    content = request.json
    if not content or 'note' not in content:
        abort(400, "Missing 'note' in request.")

    original_note = content['note']  # Corrected from 'text' to 'note'
    prompt = f"Expand the following note:\n{original_note}\n"

    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=100
        )
        expanded_text = response['choices'][0]['text'].strip()
        return jsonify({'expanded_note': expanded_text})
    except Exception as e:
        logging.error(f"Failed to expand note: {e}")
        return jsonify({"error": "Failed to expand note"}), 500
    
#for liveness and readiness:
@app.route('/health/live', methods=['GET'])
def liveness():
    return jsonify({"status": "OK", "message": "Application is live"}), 200


@app.route('/health/ready', methods=['GET'])
def readiness():
    # Implement additional logic to check database, etc. here if needed
    return jsonify({"status": "OK", "message": "Application is ready"}), 200



@app.route('/api/edify', methods=['POST'])
def edify():
    content = request.json
    text_to_edify = content.get("text", "")
    
    # Create a ThreadPoolExecutor to run the functions in parallel
    with ThreadPoolExecutor() as executor:
        future_summary = executor.submit(summarize_text, text_to_edify)
        future_references = executor.submit(reference_links, text_to_edify)
        future_topics = executor.submit(extract_topics, text_to_edify)
        
        summary = future_summary.result()
        references = future_references.result()
        topics = future_topics.result()

    if summary == "Max retries reached. Could not summarize text.":
        return jsonify({"summary": summary, "references": references, "topics": topics, "error": "APIUnavailable"})
    else:
        return jsonify({"summary": summary, "references": references, "topics": topics, "error": None})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
