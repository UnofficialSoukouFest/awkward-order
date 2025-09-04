import styles from "./index.module.css";

export function FoodRow(parameter) {
	const hasAllergens = parameter.allergens.map((item) => (
		<td className={styles.containSign} key={item}>
			{printSigns(item, parameter.food)}
		</td>
	));
	return (
		<tr>
			<th scope="row" className={styles.foodName}>
				{parameter.food.name}
			</th>
			{hasAllergens}
		</tr>
	);
}

export function printSigns(allergen, food) {
	console.log(food);
	if (food.allergens != undefined && food.allergens.includes(allergen.name))
		return "〇";
	else if (
		food.mayContains != undefined &&
		food.mayContains.includes(allergen.name)
	)
		return "△";
	else return "ー";
}
