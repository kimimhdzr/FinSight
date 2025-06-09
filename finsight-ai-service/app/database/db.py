import os
from pymongo import MongoClient
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class Database:
    _instance = None
    _client = None
    _db = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = Database()
        return cls._instance

    def __init__(self):
        if self._client is None:
            try:
                connection_string = os.getenv('DATABASE_URL')
                if not connection_string:
                    raise ValueError("DATABASE_URL environment variable is not set")
                
                self._client = MongoClient(connection_string)
                self._db = self._client.finsight
                logger.info("Connected to MongoDB successfully")
            except Exception as e:
                logger.error(f"Failed to connect to MongoDB: {str(e)}")
                raise

    def save_strategy(self, user_id, strategy):
        """
        Save an investment strategy for a specific user
        
        Args:
            user_id (str): The user's ID
            strategy (dict): The strategy data to save
            
        Returns:
            str: The ID of the inserted document
        """
        try:
            strategy['user_id'] = user_id
            result = self._db.strategies.insert_one(strategy)
            logger.info(f"Strategy saved with ID: {result.inserted_id}")
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error saving strategy: {str(e)}")
            raise

    def get_user_strategies(self, user_id):
        """
        Get all strategies for a specific user
        
        Args:
            user_id (str): The user's ID
            
        Returns:
            list: List of strategies
        """
        try:
            strategies = list(self._db.strategies.find({'user_id': user_id}))
            
            # Convert ObjectId to string for JSON serialization
            for strategy in strategies:
                strategy['_id'] = str(strategy['_id'])
                
            return strategies
        except Exception as e:
            logger.error(f"Error retrieving strategies: {str(e)}")
            raise

    def delete_strategy(self, user_id, strategy_id):
        """
        Delete a strategy for a specific user
        
        Args:
            user_id (str): The user's ID
            strategy_id (str): The strategy ID to delete
            
        Returns:
            bool: True if deletion was successful
        """
        from bson import ObjectId
        
        try:
            result = self._db.strategies.delete_one({
                '_id': ObjectId(strategy_id),
                'user_id': user_id
            })
            
            if result.deleted_count == 0:
                logger.warning(f"No strategy found with ID {strategy_id} for user {user_id}")
                return False
                
            logger.info(f"Strategy {strategy_id} deleted successfully")
            return True
        except Exception as e:
            logger.error(f"Error deleting strategy: {str(e)}")
            raise