import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../utils/config";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: 'Ролл "Наоми"',
//     description:
//       "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
//     price: 11.99,
//   },
//   {
//     id: "m2",
//     name: "Спайс в лососе",
//     description: "Рис, лосось, соус спайс",
//     price: 3.99,
//   },
//   {
//     id: "m3",
//     name: "Суши с угрем",
//     description: "Угорь копченый, соус унаги, кунжут",
//     price: 4.99,
//   },
//   {
//     id: "m4",
//     name: 'Салат "Поке с лососем"',
//     description:
//       "Рис, лосось, огурец, чука, нори, стружка тунца, соус ореховый",
//     price: 7.99,
//   },
// ];

const MealList = () => {
  const [dummyMeals, setDummyMeals] = useState([]);

  const { hasError, sendHttpRequest: fetchMealsRequest } = useHttp();

  const getMealsList = (data) => {
    const meals = [];

    const dataKeys = Object.keys(data);

    for (const meal in data[dataKeys[0]]) {
      meals.push(data[dataKeys[0]][meal]);
    }

    setDummyMeals(meals);
  };

  useEffect(() => {
    fetchMealsRequest(
      {
        endpoint: `${BASE_URL}/dummyMeals.json`,
      },
      getMealsList
    );
  }, [fetchMealsRequest]);

  const mealList = dummyMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p>Загрузка ....</p>;

  if (dummyMeals.length > 0) content = <ul>{mealList}</ul>;

  if (hasError) content = <p>Не удалось загрузить данные {hasError}</p>;

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default MealList;
