# app/questionnaire.py

def validate_questionnaire(data):
    """
    Validate and extract context from questionnaire answers.
    You can expand this based on your actual questions.
    """
    required_fields = ["name", "age", "mood", "goal"]

    for field in required_fields:
        if field not in data or not data[field]:
            return False, {}

    # Create a user context dictionary
    context = {
        "name": data["name"],
        "age": data["age"],
        "mood": data["mood"],
        "goal": data["goal"]
    }

    return True, context
