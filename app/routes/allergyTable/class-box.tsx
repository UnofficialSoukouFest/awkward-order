import { FoodRow } from "./food-row";
import styles from "./index.module.css";

export function ClassBox(parameter) {
	const foods = parameter.class.map((item) => (
		<FoodRow food={item} allergens={parameter.allergens} key={item.name} />
	));
	// console.log(parameter);
	return (
		<>
			<tr>
				<th
					colSpan={parameter.allergens.length + 1}
					className={styles.className}
				>
					{parameter.class[0] != undefined
						? `${parameter.class[0].classId}組`
						: ""}
				</th>
			</tr>
			{foods}
		</>
	);
}
