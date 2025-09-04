// import foodMenus from '../../../foodSales.mock.json';
import { data } from "react-router";
import { ClassBox } from "./class-box";
import styles from "./index.module.css";
import { matchProducts } from "~/lib/product";
// import Link from 'next/link'

export const metadata = {
	title: "蒼煌祭17th非公式ページ｜アレルギー表",
	description: "蒼煌祭17thの食販のアレルギー表のページです",
};

export async function loader({ context }) {
	const productResult = await matchProducts(context.db, []);
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		products: productResult.payload,
	};
}

export default function AllergyTable({ loaderData }) {
	const specificSubstanceList = [
		{ id: 0, name: "えび" },
		{ id: 1, name: "かに" },
		{ id: 2, name: "くるみ" },
		{ id: 3, name: "小麦" },
		{ id: 4, name: "そば" },
		{ id: 5, name: "卵" },
		{ id: 6, name: "乳" },
		{ id: 7, name: "落花生" },
		{ id: 8, name: "アーモンド" },
		{ id: 9, name: "あわび" },
		{ id: 10, name: "いか" },
		{ id: 11, name: "いくら" },
		{ id: 12, name: "オレンジ" },
		{ id: 13, name: "カシューナッツ" },
		{ id: 14, name: "キウイフルーツ" },
		{ id: 15, name: "牛肉" },
		{ id: 16, name: "ごま" },
		{ id: 17, name: "さけ" },
		{ id: 18, name: "さば" },
		{ id: 19, name: "大豆" },
		{ id: 20, name: "鶏肉" },
		{ id: 21, name: "バナナ" },
		{ id: 22, name: "豚肉" },
		{ id: 23, name: "マカデミアナッツ" },
		{ id: 24, name: "もも" },
		{ id: 25, name: "やまいも" },
		{ id: 26, name: "りんご" },
		{ id: 27, name: "ゼラチン" },
	];
	const allergens = specificSubstanceList.map((item) => (
		<th scope="col" className={styles.allergenName} key={item.id}>
			{item.name}
		</th>
	));

	// クラスごとに食品を分ける
	const products = loaderData.products;
	let classesWithMenus = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
	products.forEach((item) => {
		classesWithMenus[item.classId].push(item);
	});

	// Object.keys(classesWithMenus).forEach(key => console.log(classesWithMenus[key]));

	const classes = [];
	Object.keys(classesWithMenus).forEach((key) => {
		classes.push(
			<ClassBox
				class={classesWithMenus[key]}
				allergens={specificSubstanceList}
				key={key}
			/>,
		);
	});

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
					<tbody>{classes}</tbody>
				</table>
			</div>
		</div>
	);
}
