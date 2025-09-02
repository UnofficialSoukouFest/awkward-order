import foodMenus from '../../../foodSales.mock.json'
import { ClassBox } from './class-box'
import styles from './page.module.css'
// import Link from 'next/link'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜アレルギー表',
  description: '蒼煌祭17thの食販のアレルギー表のページです',
}

export default function AllergyTable() {
  const specificSubstanceList = [
    { id: 0, name: 'えび' },
    { id: 1, name: 'かに' },
    { id: 2, name: 'くるみ' },
    { id: 3, name: '小麦' },
    { id: 4, name: 'そば' },
    { id: 5, name: '卵' },
    { id: 6, name: '乳' },
    { id: 7, name: '落花生' },
    { id: 8, name: 'アーモンド' },
    { id: 9, name: 'あわび' },
    { id: 10, name: 'いか' },
    { id: 11, name: 'いくら' },
    { id: 12, name: 'オレンジ' },
    { id: 13, name: 'カシューナッツ' },
    { id: 14, name: 'キウイフルーツ' },
    { id: 15, name: '牛肉' },
    { id: 16, name: 'ごま' },
    { id: 17, name: 'さけ' },
    { id: 18, name: 'さば' },
    { id: 19, name: '大豆' },
    { id: 20, name: '鶏肉' },
    { id: 21, name: 'バナナ' },
    { id: 22, name: '豚肉' },
    { id: 23, name: 'マカデミアナッツ' },
    { id: 24, name: 'もも' },
    { id: 25, name: 'やまいも' },
    { id: 26, name: 'りんご' },
    { id: 27, name: 'ゼラチン' },
  ]
  const allergens = specificSubstanceList.map(item => <th scope="col" className={styles.allergenName} key={item.id}>{item.name}</th>)

  const classes = foodMenus.map(item => <ClassBox class={item} allergens={specificSubstanceList} key={item.id} />)

  return (
    <div>
      <h2>アレルギー表</h2>
      <div className={styles.howToSee}>
        <p>〇...そのアレルゲンが使われています。</p>
        <p>△...そのアレルゲンが調理過程で混入する可能性があります。</p>
        <p>ー...そのアレルゲンは使われていません。</p>
      </div>
      <p>←表が画面内に収まっていない場合、スライドできます→</p>
      <div className={styles.divtable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.tableHead}>
                アレルゲン
                <br />
                ＼
                <br />
                食品名
              </th>
              {allergens}
            </tr>
          </thead>
          <tbody>
            {classes}
          </tbody>
        </table>
      </div>
    </div>
  )
}
