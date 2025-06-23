# finsight-ai-service/finsight-ai-service/README.md

# FinSight AI Service

This project is a backend service for the FinSight AI module, built using FastAPI. It provides an API for interacting with an AI investment advisor model, allowing users to get personalized investment strategies based on their preferences.

## Project Structure

```
finsight-ai-service
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── models
│   │   ├── __init__.py
│   │   └── investment_advisor.py
│   ├── routers
│   │   ├── __init__.py
│   │   └── advisor.py
│   ├── services
│   │   ├── __init__.py
│   │   └── ai_service.py
│   └── utils
│       ├── __init__.py
│       └── helpers.py
├── requirements.txt
├── Dockerfile
├── .env
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd finsight-ai-service
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your configuration variables, such as API keys and database URLs.

5. **Run the application:**
   ```
   uvicorn app.main:app --reload
   ```

## Usage

Once the server is running, you can access the API at `http://localhost:8000`. The API documentation is available at `http://localhost:8000/docs`.

## Docker

To build and run the application using Docker, use the following commands:

1. **Build the Docker image:**
   ```
   docker build -t finsight-ai-service .
   ```

2. **Run the Docker container:**
   ```
   docker run -d -p 8000:8000 finsight-ai-service
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.