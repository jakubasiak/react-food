import React, { useState, useEffect } from 'react'
import MealItem from './MealItem';

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function featchMeals() {
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                // TODO error handle
            }

            const meals = await response.json();
            setLoadedMeals(meals);
        }

        featchMeals();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}
