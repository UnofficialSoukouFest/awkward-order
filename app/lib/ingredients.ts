import { type CompositeIngredients } from "@latimeria/shared";

export function formatIngredient(ingredient: string[], compositeIngredients: CompositeIngredients[]): string {
    let result: string;
    const constructedIngredient = [];

    for (const part of ingredient) {
        let formattedPart = part;
        formattedPart += compositeIngredients.filter(item => item.name == part).map(item => `${item}${compositeIngredientsConstructerFirst(compositeIngredients, part)}`).join("、");
        constructedIngredient.push(formattedPart);
    }
    result = constructedIngredient.join("、");
    return result;
}

function compositeIngredientsConstructerFirst(compositeIngredients: CompositeIngredients[], root: string) {
    let result = "";
    if (compositeIngredients.map(item => item.name).includes(root)) {
        result += " (";
        for (let i = 0; i < compositeIngredients.filter(item => item.name == root).length; i++) {
            result += compositeIngredients.filter(item => item.name == root)[i].name;
            result += compositeIngredientsConstructer(compositeIngredients.filter(item => item.name == root)[i].compositeIngredients ?? []);
        }
        result += "）";
    }
    return result;
}

function compositeIngredientsConstructer(compositeIngredients: CompositeIngredients[]) {
    let result = "";
    if (compositeIngredients != undefined) {
        result += " (";
        for (let i = 0; i < compositeIngredients.length; i++) {
            result += compositeIngredients[i].name;
            result += compositeIngredientsConstructer(compositeIngredients[i].compositeIngredients ?? []);
        }
        result += "）";
    }
    return result;
}
