import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()

def test_connection():
    try:
        # Get connection string from environment variables
        connection_string = os.getenv('DATABASE_URL')
        
        # Connect to MongoDB
        client = MongoClient(connection_string)
        
        # Check the connection by listing database names
        dbs = client.list_database_names()
        print(f"Connected successfully! Available databases: {dbs}")
        
        # Access the FinSight database
        db = client.finsight
        print(f"Connected to database: {db.name}")
        
        # List collections in the database
        collections = db.list_collection_names()
        print(f"Collections in {db.name}: {collections}")
        
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection()