import type { CompositeIngredients } from "@latimeria/shared";

export function formatIngredient(
	ingredient: string[],
	compositeIngredients: CompositeIngredients[],
): string {
	let result: string;
	const constructedIngredient = [];

	if (!ingredient.includes("未確認")){
		for (const part of ingredient) {
			let formattedPart = part;
			formattedPart += compositeIngredients
				.filter((item) => item.name == part)
				.map(
					(item) =>{
						console.log(compositeIngredients)
						return `${compositeIngredientsConstructerFirst(compositeIngredients, part)}`
					}
				)
				.join("、");
			constructedIngredient.push(formattedPart);
		}
	}
	else {
		constructedIngredient.push("申し訳ありませんが、確認が取れていないためデータを表示できません。")
	}
	result = constructedIngredient.join("、");
	return result;
}

function compositeIngredientsConstructerFirst(
	compositeIngredients: CompositeIngredients[],
	root: string,
) {
	let result = "";
	if (compositeIngredients.map((item) => item.name).includes(root)) {
		result += compositeIngredients.length > 0 ? "（" : "";
		for (
			let i = 0;
			i < compositeIngredients.filter((item) => item.name == root).length;
			i++
		) {
			// result += compositeIngredients.filter((item) => item.name == root)[i]
			// 	.name;
			result += compositeIngredientsConstructer(
				compositeIngredients.filter((item) => item.name == root)[i]
					.compositeIngredients ?? [],
			);
		}
		// result += compositeIngredients.length > 0 ? "）" : "";
	}
	return result;
}

function compositeIngredientsConstructer(
	compositeIngredients: CompositeIngredients[],
) {
	let result = "";
	if (compositeIngredients != undefined) {
		// result += " (";
		for (let i = 0; i < compositeIngredients.length; i++) {
			result += compositeIngredients[i].name;
			result += compositeIngredientsConstructer(
				compositeIngredients[i].compositeIngredients ?? [],
			);
			if (i + 1 != compositeIngredients.length) result += "、";
		}
		result += compositeIngredients.length > 0 ? "）" : "";
	}
	return result;
}
