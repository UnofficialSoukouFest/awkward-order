import {
	Link,
	Popup,
	PopupCloseButton,
	PopupProvider,
	PopupToggleButton,
} from "@latimeria/ganoine";
import { useAtom } from "jotai";
import { data } from "react-router";
import { MenuCardAll } from "~/component/card/menu-card";
import { SelectSubstance } from "~/component/food/select-substances";
import { TitleBarWithBack } from "~/component/title-bar";
import { specificSubstanceList } from "~/lib/allergen";
import { matchProducts } from "~/lib/product";
import { matchPrograms } from "~/lib/program";
import { allergySelectAtom } from "../select/atom";
import type { Route } from "./+types";
import styles from "./menu-all.module.css";

export async function loader({ context }: Route.LoaderArgs) {
	const programsResult = await matchPrograms(context.db, []);
	if (programsResult.type === "error") {
		throw data(programsResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, []);
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		programs: programsResult.payload,
		products: productResult.payload,
	};
}

export default function Menu({ loaderData }: Route.ComponentProps) {
	const products = loaderData.products;
	const [selected, _setSelected] = useAtom(allergySelectAtom);
	// filteredproductsは、選択されたアレルギーを含まない商品のリスト
	let _filteredproducts = [];
	_filteredproducts = loaderData.products.filter((product) =>
		product.allergens.every(
			(allergen) =>
				!specificSubstanceList
					.filter((item) => selected.has(item.id))
					.map((item) => item.name)
					.includes(allergen),
		),
	);
	return (
		<>
			<TitleBarWithBack
				pagename="メニューの一覧"
				themeColor="#0066cc"
				textColor="#FFFCFC"
			/>
			<div className={styles.body}>
				<p>
					商品をタップすると、それを取り扱っているクラスのページへ移動します。
				</p>
				<p>アレルギー情報は現在準備中です</p>
				{/*<div className={styles.selectHeader}>
					<PopupProvider>
						<PopupToggleButton>アレルギーでフィルター</PopupToggleButton>
						<Popup>
							<div className={styles.dialogBox}>
								<SelectSubstance />
								{/* selected={selected} setSelected={setSelected} /> */}
				{/*<div className={styles.PopUpCloseButtonDiv}>
									<PopupCloseButton>完了</PopupCloseButton>
								</div>
							</div>
						</Popup>
					</PopupProvider>
					<Link href={""}>アレルギー表はこちらから</Link>
				</div>
				{!selected.has(0) ? (
					<p>
						{specificSubstanceList
							.filter((item) => selected.has(item.id))
							.map((item) => item.name)
							.join("、")}
						を含まない：
					</p>
				) : (
					""
								)*/}
				<div className={styles.cards}>
					{products.map((content) => {
						const classNumber =
							loaderData.programs.find((v) => v.id === content.classId)
								?.class ?? 0;
						return (
							<div className={styles.card} key={content.id}>
								<MenuCardAll
									key={content.id}
									product={content}
									classNumber={classNumber}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
