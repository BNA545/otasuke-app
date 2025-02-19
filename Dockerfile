# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.11-slim

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# 明示的にポートを設定
ENV PORT=8000

# PostgreSQLの開発パッケージをインストール
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install pip requirements
COPY backend/requirements.txt .
RUN python -m pip install -r requirements.txt

# バックエンドディレクトリをコピー
COPY ./backend /app

# アプリケーションのワーキングディレクトリを設定
WORKDIR /app

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# uvicornを直接使用してFastAPIアプリを起動
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]