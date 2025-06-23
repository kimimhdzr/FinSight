from app.database.db import Database
import logging

logger = logging.getLogger(__name__)

class StrategyService:
    def __init__(self):
        self.db = Database.get_instance()
    
    def save_strategy(self, user_id, strategy_data):
        """
        Save an investment strategy
        
        Args:
            user_id (str): The user's ID
            strategy_data (dict): Strategy data
            
        Returns:
            dict: The saved strategy with ID
        """
        try:
            # Validate required fields
            required_fields = ['name', 'targetReturn', 'riskLevel', 'timeHorizon', 'allocation']
            for field in required_fields:
                if field not in strategy_data:
                    raise ValueError(f"Missing required field: {field}")
            
            # Save to database
            strategy_id = self.db.save_strategy(user_id, strategy_data)
            
            # Return the strategy with ID
            return {
                **strategy_data,
                '_id': strategy_id
            }
        except Exception as e:
            logger.error(f"Error in save_strategy: {str(e)}")
            raise
    
    def get_user_strategies(self, user_id):
        """
        Get all strategies for a user
        
        Args:
            user_id (str): The user's ID
            
        Returns:
            list: List of strategies
        """
        return self.db.get_user_strategies(user_id)
    
    def delete_strategy(self, user_id, strategy_id):
        """
        Delete a specific strategy
        
        Args:
            user_id (str): The user's ID
            strategy_id (str): The strategy ID to delete
            
        Returns:
            bool: True if deletion was successful
        """
        return self.db.delete_strategy(user_id, strategy_id)