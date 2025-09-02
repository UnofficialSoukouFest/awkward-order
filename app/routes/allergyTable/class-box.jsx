import { FoodRow } from './food-row'
import programs from '../../../program.mock.json'
import styles from './page.module.css'

export function ClassBox(parameter) {
  const foods = parameter.class.menus.map(item => <FoodRow food={item} allergens={parameter.allergens} key={item.name} />)
  return (
    <>
      <tr>
        <th colSpan={parameter.allergens.length + 1} className={styles.className}>{programs.find(item => item.id == parameter.class.id).name}</th>
      </tr>
      {foods}
    </>
  )
}
