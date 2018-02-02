import os
from flask import Flask, jsonify, request
from watson_developer_cloud import NaturalLanguageClassifierV1

natural_language_classifier = NaturalLanguageClassifierV1(
    username='c78225be-0efd-4cc3-9d6f-be656a3a58a1', password='xnuKYgqo6oZn')

classifier_id = '0015b6x265-nlc-37174'
comment_text = 'I love coffee'
analysis_results = natural_language_classifier.classify(
    classifier_id, comment_text)

if "classes" in analysis_results.keys():
    for predicted_class in analysis_results['classes']:
        print(predicted_class['class_name'],
              " - ", predicted_class['confidence'])

app = Flask(__name__)


@app.route('/')
def Welcome():
    return app.send_static_file('index.html')


@app.route('/analyze', methods=['GET', 'POST'])
def Analyze():
    comment_text = request.form['text']
    classes = {}
    if comment_text != "":
        classes = natural_language_classifier.classify(
            classifier_id, comment_text)

    return jsonify(classes)


port = os.getenv('PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port), debug=True)
