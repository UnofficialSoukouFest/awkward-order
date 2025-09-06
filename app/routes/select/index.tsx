import {
	Link,
	Popup,
	PopupCloseButton,
	PopupProvider,
	PopupToggleButton,
} from "@latimeria/ganoine";
import { useAtom } from "jotai";
import { data } from "react-router";
import { Drawer } from "vaul";
import { OrderCard } from "~/component/card/order-card";
import { SelectCard } from "~/component/card/select-card";
import { SelectSubstance } from "~/component/food/select-substances";
import { TitleBarWithBack } from "~/component/title-bar";
import { specificSubstanceList } from "~/lib/allergen";
import { order, select } from "~/lib/card-builder";
import { addOrder, matchOrder } from "~/lib/order";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import { commitSession, getSession } from "~/sessions.server";
import MdiPencilOutline from "~icons/mdi/pencil-outline";
import type { Route } from "./+types";
import { allergySelectAtom } from "./atom";
import styles from "./index.module.css";

export async function loader({ params, context, request }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classNumber),
	});
	if (programResult.type === "error") {
		throw programResult.payload;
	}
	const productResult = await matchProducts(context.db, [
		{ classId: programResult.payload.id },
	]);
	if (productResult.type === "error") {
		throw productResult.payload;
	}
	const session = await getSession(request.headers.get("Cookie"));
	const orderData = session.has("orderId")
		? await matchOrder(context.db, { id: session.get("orderId") })
		: await addOrder(context.db, {
				classId: programResult.payload.id,
				date: new Date(),
				purchases: [],
			});
	if (orderData.type === "error") {
		throw orderData.payload;
	}
	session.set("orderId", orderData.payload.id);
	return data(
		{
			program: programResult.payload,
			products: productResult.payload,
			order: orderData.payload,
		},
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
}

export default function Select({ loaderData }: Route.ComponentProps) {
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
				pagename="商品のメモ"
				themeColor="#0066cc"
				textColor="#FFFCFC"
			/>
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
			)}*/}
			<div className={styles.selectProducts}>
				{select(loaderData.products).map(
					(
						[productDisplayData, productId],
					) => (
						<SelectCard key={productId} product={productDisplayData} color={loaderData.program.color} />
					),
				)}
			</div>
			{/*
			<div className={styles.selectButtom}>
				<Drawer.Root open={true}>
					<Drawer.Overlay className="" />
					<Drawer.Portal>
						<Drawer.Content
							data-testid="content"
							className={styles.selectButtomContent}
						>
							{order(loaderData.order, loaderData.program.class).map((item) => (
								<OrderCard
									key={item[1]}
									product={item[0].product}
									program={loaderData.program}
								/>
							))}
							<p>
								<MdiPencilOutline /> 合計金額:{" "}
								{loaderData.order.purchases.reduce(
									(sum, item) => sum + item.price,
									0,
								)}
								円
							</p>
						</Drawer.Content>
					</Drawer.Portal>
				</Drawer.Root>
			</div>
			<Link href={`../order/${loaderData.order.id}`}>拡大表示</Link>*/}
		</>
	);
}
