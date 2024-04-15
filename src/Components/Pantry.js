import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AppB from './OpenAi';

const Pantry = () => {
  const [userIngredients, setUserIngredients] = useState([]); // State to store user's ingredients  
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user authentication
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/SignIn');
    }
  
    // // Set up a timer to refresh authentication status every minute
    // const intervalId = setInterval(() => {
    //   const newAuthToken = localStorage.getItem('authToken');
    //   if (!newAuthToken) {
    //     setIsLoggedIn(false);
    //     navigate('/SignIn');
    //   }
    // }, 60000);
  
    // // Clean up the timer when the component unmounts
    // return () => clearInterval(intervalId);
  }, [navigate]);

  const addIngredientToPantry = async () => {
    if(!isLoggedIn){
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/Ingredient/addIngredient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: ingredientName }),
      });

      if (response.ok) {
        console.log('Ingredient added successfully');
        // Update selectedIngredients state with the newly added ingredient
        setSelectedIngredients([...selectedIngredients, ingredientName]);
        // Clear the input field after adding the ingredient
        setIngredientName('');
      } else {
        console.log('Failed to add ingredient');
      }
    } catch (error) {
      console.log('An error occurred while adding ingredient:', error);
    }
  };
 

  const removeIngredientFromPantry = async (index) => {
    if(!isLoggedIn){
      return;
    }
    try {
      
      const ingredientToRemove = selectedIngredients[index];
      
      const newIngredients = [...selectedIngredients];
      
      newIngredients.splice(index, 1);
     
      setSelectedIngredients(newIngredients);
  
      // Send a DELETE request to your backend API to remove the ingredient from the database
      const response = await fetch(`http://localhost:5000/Ingredient/removeIngredient/${ingredientToRemove}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Ingredient removed successfully from the database');
      } else {
        console.log('Failed to remove ingredient from the database');
      }
    } catch (error) {
      console.log('An error occurred while removing ingredient:', error);
    }
  };
  const AddIngredientForm = ({ addIngredient }) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      if (ingredientName.trim() !== '') {
        addIngredient(ingredientName.trim());
        setIngredientName('');
      }
    };

    return (

      <div>
        {isLoggedIn ? (
          <div>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter Ingredient name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            />
            <button type="submit">Add</button>
            </form>
          </div>
        ) : (
          <div>
            <p>Please sign in to access your pantry.</p>
            </div>
        )}
      </div>

      
    );
  };

  return (
    <div>
      <h2>Add Ingredients to your pantry</h2>
      <AddIngredientForm addIngredient={addIngredientToPantry} />

      <h2>My Pantry</h2>
      <ul>
        {userIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => removeIngredientFromPantry(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Include OpenAI component here */}
      <AppB selectedIngredients={selectedIngredients} />
    </div>
  );
};

export default Pantry;

// const handleAddIngredient = async () => {

//   try {
//     const response = await fetch('http://localhost:5000/Ingredient/addIngredient', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(ingredientName),
//     });

//     if (response.ok) {
//       console.log('Ingredient added successfully');
   
//     } else {
//       console.log('Failed to add ingredient');
     
//     }
//   } catch (error) {
//     console.log('An error occurred while adding ingredient:', error);
    
//   }
// };

// {
//   "$id": "1",
//   "$values": [
//       {
//           "$id": "2",
//           "ingredientId": 1,
//           "name": "chicken",
//           "user": null
//       }
//   ]
// }