import {
	Link,
	Popup,
	PopupProvider,
	PopupToggleButton,
	usePopup,
} from "@latimeria/ganoine";
import { useAtom } from "jotai";
import { useState } from "react";
import { data } from "react-router";
import { Drawer } from "vaul";
import { OrderCard } from "~/component/card/order-card";
import { type DisplayType, SelectCard } from "~/component/card/select-card";
import { TitleBarWithBack } from "~/component/title-bar";
import { specificSubstanceList } from "~/lib/allergen";
import { order, select } from "~/lib/card-builder";
import { addOrder, matchOrder } from "~/lib/order";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import { commitSession, getSession } from "~/sessions.server";
import MdiPencilOutline from "~icons/mdi/pencil-outline";
import type { Route } from "./+types";
import { allergySelectAtom, productContentAtom } from "./atom";
import styles from "./index.module.css";
import { Button } from "react-aria-components";
import type { Purchases } from "~/lib/product-cart";
import type { Products } from "@latimeria/shared";

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

// It's percentage
const snapPoints = [0.2, 0.5, 0.75];

export default function Select({ loaderData }: Route.ComponentProps) {
	const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
	const [selected, _setSelected] = useAtom(allergySelectAtom);
	const [productContent, setProductContent] = useAtom(productContentAtom);
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
			<div className={styles.selectProducts}>
				{select(loaderData.products).map(([productDisplayData, productId]) => (
					<PopupProvider key={productId}>
						<ProductSelectCard
							productId={productId}
							productDisplayData={productDisplayData}
							color={loaderData.program.color}
							key={productId}
						/>
					</PopupProvider>
				))}
			</div>
			<div className={styles.selectButtom}>
				<Link href={`../order/${loaderData.order.id}`}>拡大表示</Link>
				<Drawer.Root
					modal={false}
					snapPoints={snapPoints}
					activeSnapPoint={snap}
					setActiveSnapPoint={setSnap}
				>
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
								{purchasesTotalPrice(
									productContent.purchases,
									loaderData.products,
								)}
								円
							</p>
						</Drawer.Content>
					</Drawer.Portal>
				</Drawer.Root>
			</div>
			<Link href={`../order/${loaderData.order.id}`}>拡大表示</Link>
		</>
	);
}

function purchasesTotalPrice(purchases: Purchases, products: Products) {
	const partPrices: number[] = [];
	for (const [productId, count] of purchases.entries()) {
		const matchedProduct = products.find((v) => v.id === productId);
		if (!matchedProduct) {
			throw new Error("No matched product");
		}
		partPrices.push(matchedProduct.price * count);
	}
	return partPrices.reduce((prev, cur) => prev + cur, 0);
}

function CountAdjustPopup({
	productId,
	productDisplayData,
}: {
	productId: number;
	productDisplayData: DisplayType;
}) {
	const [count, setCount] = useState(1);
	const [productContent, setProductContent] = useAtom(productContentAtom);
	return (
		<Popup>
			<div>
				<h2>{productDisplayData.name}</h2>
				<p>{productDisplayData.price * count}円</p>
			</div>
			<div>
				<Button onPress={() => setCount((v) => v - 1)}>-</Button>
				<span>{count}</span>
				<Button onPress={() => setCount((v) => v + 1)}>+</Button>
			</div>
			<div>
				<PopupToggleButton
					onPress={() =>
						setProductContent((e) => {
							e.add(productId);
							return e;
						})
					}
				>
					追加
				</PopupToggleButton>
			</div>
		</Popup>
	);
}

function ProductSelectCard({
	productId,
	productDisplayData,
	color,
}: {
	productId: number;
	productDisplayData: DisplayType;
	color: string;
}) {
	const { togglePopup } = usePopup();
	return (
		<>
			<SelectCard
				key={productId}
				product={productDisplayData}
				color={color}
				onClick={() => togglePopup()}
			/>
			<CountAdjustPopup
				productId={productId}
				productDisplayData={productDisplayData}
			/>
		</>
	);
}
