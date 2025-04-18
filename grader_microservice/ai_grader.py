import os
import flask
from flask import request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
app = flask.Flask(__name__)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-1.5-pro")

@app.route("/grade", methods=["POST"])
def grade_submission():
    data = request.get_json()

    submitted_latex = data.get("submittedLatex", "")
    correct_latex = data.get("correctLatex", "")
    submitted_img_url = data.get("submittedImageUrl", "")
    correct_img_url = data.get("correctImageUrl", "")

    prompt = f"""
You are an expert LaTeX grader for a competitive math tournament.

A student submitted an answer to a question by providing:
- A LaTeX code string they wrote
- A rendered image of that code

You are given:
- The correct LaTeX code
- The correct rendered image

Your job is to evaluate the accuracy of the submission using both the written code and the image, but focus on mathematical correctness and visual equivalence, not just syntactic similarity.

Use this grading policy:

1. ✅ If the student's output is mathematically and visually identical to the correct one (even if the code is written differently), award full points.
2. ⚠️ If there are minor differences in layout or symbols, deduct small amounts (e.g. misaligned subscripts, different but equivalent notation).
3. ❌ If the submission is slightly incomplete or slightly incorrect (e.g., missing +C), deduct moderately, but not more than 30 points unless the mistake changes the meaning entirely. 
4. ❌ If the submission is incomplete, semantically wrong, or visually misleading, assign a lower score accordingly.
5. ✨ LaTeX code is helpful to justify the submission — but rendering quality and meaning take priority.

For your feedback: Make sure it's constructive but don't give away the right latex code.

Your response format MUST be:

Score: <number>
Feedback: <short feedback>

Do not output anything else. Be fair, consistent, and explain your reasoning concisely.

---

Correct LaTeX:
{correct_latex}

Student's LaTeX:
{submitted_latex}

Correct Image: {correct_img_url}
Student's Image: {submitted_img_url}

Begin grading now.
"""

    try:
        response = model.generate_content(prompt)
        output = response.text.strip()

        # Example expected: "Score: 88\nFeedback: The student..."
        lines = output.splitlines()
        score_line = next((l for l in lines if l.lower().startswith("score")), "Score: 0")
        feedback_line = next((l for l in lines if l.lower().startswith("feedback")), "Feedback: No feedback.")

        score = int("".join(filter(str.isdigit, score_line)))
        score = max(0, min(100, score))

        feedback = feedback_line.replace("Feedback:", "").strip()

        return jsonify({ "score": score, "feedback": feedback })

    except Exception as e:
        print("Error during AI grading:", e)
        return jsonify({ "score": 0, "feedback": "Grading failed.", "error": str(e) }), 500

if __name__ == "__main__":
    app.run(port=5000)
