FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# 環境変数を設定（ログなどで利用可能）
ENV PORT=8000
ENV HOST=0.0.0.0

# 本番環境用の設定（--reloadフラグを削除）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]