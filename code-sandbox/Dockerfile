FROM python:3.9-slim

# Install required packages
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -s /bin/bash codeuser

# Set up the working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the code execution script
COPY execute_code.py .

# Set permissions
RUN chown -R codeuser:codeuser /app

# Switch to non-root user
USER codeuser

# Run the code execution service
CMD ["python", "execute_code.py"] 