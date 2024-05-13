import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

export default function Meals() {
    const { isLoading, data: loadedMeals, error } = useHttp('http://localhost:3000/meals', []);

    if (isLoading) {
        return <p className="center">Fetchnig meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error.message} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}
