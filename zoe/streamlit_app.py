### streamlit_app.py
import streamlit as st
import requests

st.set_page_config(page_title="Empathetic ACE Chatbot", layout="centered")
st.title("\U0001F499 Empathetic ACE Chatbot")

st.session_state.api_url = "http://localhost:5000"

if "submitted_name" not in st.session_state:
    st.session_state.submitted_name = False

if not st.session_state.submitted_name:
    name = st.text_input("What's your name?")
    age = st.number_input("What's your age?", min_value=0, max_value=120, step=1)
    if st.button("Start Questionnaire"):
        st.session_state.name = name
        st.session_state.age = age
        st.session_state.submitted_name = True
        st.session_state.responses = {}
        st.session_state.question_index = 0
        st.session_state.user_id = f"{name}_{age}"
        st.rerun()

if st.session_state.get("submitted_name") and "question_index" in st.session_state:
    q_res = requests.get(f"{st.session_state.api_url}/questionnaire/form").json()
    questions = q_res["questions"]

    if st.session_state.question_index < len(questions):
        q = questions[st.session_state.question_index]
        st.subheader(q["question"])

        col1, col2 = st.columns(2)
        if col1.button("Yes"):
            st.session_state.responses[q["id"]] = "Yes"
            st.session_state.question_index += 1
            st.rerun()
        if col2.button("No"):
            st.session_state.responses[q["id"]] = "No"
            st.session_state.question_index += 1
            st.rerun()
    else:
        st.success("Thank you! Submitting your responses...")
        payload = {
            "user_id": st.session_state.user_id,
            "responses": st.session_state.responses
        }
        r = requests.post(f"{st.session_state.api_url}/questionnaire", json=payload)
        st.json(r.json())
        st.session_state.done_questionnaire = True
        st.session_state.chat_history = []
        st.rerun()

if st.session_state.get("done_questionnaire"):
    st.subheader("Now you can chat with the empathetic assistant \U0001F4AC")

    for entry in st.session_state.chat_history:
        st.markdown(f"**You:** {entry['user']}")
        st.markdown(f"**Bot:** {entry['bot']}")

    msg = st.text_input("Your message:")
    if st.button("Send"):
        payload = {
            "user_id": st.session_state.user_id,
            "message": msg
        }
        res = requests.post(f"{st.session_state.api_url}/chat", json=payload)
        bot_reply = res.json()["response"]
        st.session_state.chat_history.append({"user": msg, "bot": bot_reply})
        st.rerun()
