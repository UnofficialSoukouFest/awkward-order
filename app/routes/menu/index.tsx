import { data } from "react-router";
import { matchProducts } from "~/lib/product";
import type { Route } from "./+types";
import {
	Link,
	Popup,
	PopupCloseButton,
	PopupProvider,
	PopupToggleButton,
} from "@latimeria/ganoine";
import { useAtom } from "jotai";
import { specificSubstanceList } from "~/lib/allergen";
import { allergySelectAtom } from "../select/atom";
import { SelectSubstance } from "~/component/food/select-substances";
import styles from "./menu-all.module.css"
import { MenuCard } from "~/component/card/menu-card";
import { select } from "~/lib/card-builder";

export async function loader({ context }: Route.LoaderArgs) {
	const productResult = await matchProducts(context.db, []);
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
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
		<div>
			Menu List Page(all class)
			{products.length} menu!
			<div className={styles.selectHeader}>
				<PopupProvider>
					<PopupToggleButton>アレルギーでフィルター</PopupToggleButton>
					<Popup>
						<div className={styles.dialogBox}>
							<SelectSubstance />
							{/* selected={selected} setSelected={setSelected} /> */}
							<div className={styles.PopUpCloseButtonDiv}>
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
			)}
			<div>
				{select(loaderData.products).map((
										[productDisplayData, productId], // todo:selectの返り値をDisplayTypeにする
									) => (
										<MenuCard key={productId} product={productDisplayData} classNumber={1} />
									),
								)}
			</div>
		</div>
	);
}
