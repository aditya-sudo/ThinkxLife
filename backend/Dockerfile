# 1. Base image
FROM python:3.11-slim

# 2. Set working dir
WORKDIR /app

# 3. Copy & install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install -r requirements.txt

# 4. Copy the rest of your code
COPY . .

# 5. (Optional) Build or index step
# RUN python build_index.py

# 6. Expose the port your app will run on
EXPOSE 8000

# 7. Launch via uvicorn CLI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
