import styles from './page.module.css'

export function FoodRow(parameter) {
  const hasAllergens = parameter.allergens.map(item => <td className={styles.containSign} key={item}>{printSigns(item, parameter.food)}</td>)
  return (
    <tr>
      <th scope="row" className={styles.foodName}>{parameter.food.name}</th>
      {hasAllergens}
    </tr>
  )
}

export function printSigns(allergen, food) {
  if (food.specificIngredients.includes(allergen.name))
    return '〇'
  else if (food.mayContain.includes(allergen.name))
    return '△'
  else
    return 'ー'
}
