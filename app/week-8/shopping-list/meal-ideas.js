"use client";

import React, { useState, useEffect } from 'react';

const fetchMealIdeasWithDetails = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();

  if (!data.meals) {
    return [];
  }

  const mealDetailsPromises = data.meals.map(async (meal) => {
    const detailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    const detailsData = await detailsResponse.json();
    return detailsData.meals[0];
  });

  return Promise.all(mealDetailsPromises);
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [noMealFound, setNoMealFound] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const loadMealIdeas = async () => {
      if (ingredient) {
        const fetchedMeals = await fetchMealIdeasWithDetails(ingredient);
        if (fetchedMeals.length === 0) {
          setNoMealFound(true);
        } else {
          setNoMealFound(false);
          setMeals(fetchedMeals);
        }
      }
    };

    loadMealIdeas();
  }, [ingredient]);

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} (${meal[`strMeasure${i}`]})`);
      } else {
        break;
      }
    }
    return ingredients;
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Meal Ideas</h2>
      {noMealFound ? (
        <p className="text-white">No meal ideas found for {ingredient}</p>
      ) : (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className={`p-2 m-4 bg-slate-900 max-w-sm cursor-pointer 
                ${selectedMeal === meal.idMeal ? 'bg-orange-800' : 'hover:bg-orange-800'}
              `}
              onClick={() => setSelectedMeal(meal.idMeal === selectedMeal ? null : meal.idMeal)}
            >
              <h3 className="text-lg font-semibold text-white">{meal.strMeal}</h3>
              {selectedMeal === meal.idMeal && (
                <ul className="pl-4 list-disc text-white">
                  {getIngredients(meal).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealIdeas;
