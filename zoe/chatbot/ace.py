### chatbot/ace.py
def process_ace_questionnaire(user_id, responses):
    score = sum(1 for answer in responses.values() if answer.lower() == 'yes')
    return {
        "ACE_score": score,
        "interpretation": interpret_ace_score(score)
    }

def interpret_ace_score(score):
    if score == 0:
        return "No significant adverse childhood experiences reported."
    elif score <= 2:
        return "Low level of adverse experiences."
    elif score <= 5:
        return "Moderate level of adverse experiences."
    else:
        return "High level of adverse experiences; consider professional support."
