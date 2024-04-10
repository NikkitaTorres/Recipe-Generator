import React,  { useState } from 'react';
import OpenAi from './OpenAi';




const UserProfile = () => {
  const [pantryItems, setPantryItems] = useState([
    {
      name: 'Pasta',
      id: 1,
    },
    {
      name: 'Tomato Sauce',
      id: 2,
    },
    {
      name: 'Ground Beef',
      id: 3,
    },
    {
      name: 'Onion',
      id: 4,
    },
    {
      name: 'Garlic',
      id: 5,
    },
    {
      name: 'Olive Oil',
      id: 6,
    },
    {
      name: 'Salt',
      id: 7,
    },
    {
      name: 'Pepper',
      id: 8,
    },
    {
      name: 'Basil',
      id: 9,
    },
    {
      name: 'Parmesan Cheese',
      id: 10,
    },
    {
      name: 'Milk',
      id: 11,
    },
    {
      name: 'Butter',
      id: 12,
    },
    {
      name: 'Flour',
      id: 13,
    },
    {
      name: 'Sugar',
      id: 14,
    },
    {
      name: 'Eggs',
      id: 15,
    },
    {
      name: 'Baking Powder',
      id: 16,
    },
    {
      name: 'Vanilla Extract',
      id: 17,
    },
    {
      name: 'Chocolate Chips',
      id: 18,
    },
    {
      name: 'Chicken Breast',
      id: 19,
    },
    {
      name: 'Broccoli',
      id: 20,
    },
    {
      name: 'Bell Pepper',
      id: 21,
    },
    {
      name: 'Carrot',
      id: 22,
    },
    {
      name: 'Celery',
      id: 23,
    },
    {
      name: 'Chicken Broth',
      id: 24,
    },
    {
      name: 'Rice',
      id: 25,
    },
    {
      name: 'Soy Sauce',
      id: 26,
    },
    {
      name: 'Ginger',
      id: 27,
    },
    {
      name: 'Green Onion',
      id: 28,
    },
    {
      name: 'Beef',
      id: 29,
    },
    {
      name: 'Pork',
      id: 30,
    },
    {
      name: 'Shrimp',
      id: 31,
    },
    {
      name: 'Fish Sauce',
      id: 32,
    },
    {
      name: 'Lime',
      id: 33,
    },
    {
      name: 'Cilantro',
      id: 34,
    },
    {
      name: 'Coconut Milk',
      id: 35,
    },
    {
      name: 'Curry Paste',
      id: 36,
    }
  ]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  const handleIngredientClick = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  }

  return (
    <div className="flex">
  <div>
    <h1 className="text-4xl items-center">Your Pantry Items</h1>
    <div className="flex flex-wrap justify-end border-solid-black">
      {pantryItems.map((pantryItem) => (
        <button
          key={pantryItem.id}
          className={`mr-2 mb-2 bg-blue-500 text-white font-bold py-1 px-4 rounded ${selectedIngredients.includes(
            pantryItem
          ) ? "bg-gray-500" : "hover:bg-blue-700"}`}
          onClick={() => handleIngredientClick(pantryItem)}
        >
          {pantryItem.name}
        </button>

      ))}
      <div>
      <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Ingredient</button>
      <button className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete Ingredient</button>
      <button className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add to Pantry</button>
      </div> 
    </div>
  </div>
  <div>
    <OpenAi selectedIngredients={selectedIngredients} />
  </div>
</div>
    
  );
};

export default UserProfile;

// write a function on click the ingredient will go to the recipe card.
// write a function that maps through all the ingredients in user profile and displays them in button form or whatever.
// find a way to add ingredients to user profile. maybe a form that takes in the ingredient and adds it to the user profile.
// write a function that deletes an ingredient from the user profile. maybe a button that deletes the ingredient from the user profile.