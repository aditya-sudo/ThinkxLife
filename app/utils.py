# app/utils.py

import datetime

def log_message(source, message):
    """
    Simple logger for tracking messages.
    """
    timestamp = datetime.datetime.now().isoformat()
    print(f"[{timestamp}] [{source.upper()}]: {message}")
