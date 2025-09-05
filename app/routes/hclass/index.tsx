import { Button } from "@latimeria/ganoine";
import type { Product } from "@latimeria/shared";
import { data } from "react-router";
import { MenuCard, MenuCardPick } from "~/component/card/menu-card";
import Image from "~/component/image";
import { TitleBarWithBack } from "~/component/title-bar";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types/index";
import styles from "./programs.module.css";
import { select, order } from "~/lib/hogeType";

export async function loader({ params, context }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classId),
	});
	if (programResult.type === "error") {
		throw data(programResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, [
		{
			classId: Number(programResult.payload.id),
		},
	]);
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		program: programResult.payload,
		products: productResult.payload,
	};
}

export type productKind = {
	classId?: number;
	id: number;
	name: string;
	price: number;
};

export default function HClass({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<TitleBarWithBack
				pagename={loaderData.program.name}
				themeColor={loaderData.program.color}
				textColor="var(--semantic-text-white)"
			/>
			<div className={styles.body}>
				<div className={styles.pr}>
					<Image
						src={`/${loaderData.program.assets?.thumbnail ?? "kari-fallback.png"}`}
						alt="クラスのPR画像"
						style={{
							backgroundColor: loaderData.program.color,
						}}
					/>
					<p>{loaderData.program.description}</p>
				</div>
				<div className={styles.menu}>
					<h1>メニュー</h1>
					<div className={styles.topMenu}>
						<h2>激推しメニュー</h2>
						<div className={styles.topCards}>
							<div
								className={styles.topBack}
								style={{
									backgroundColor: loaderData.program.color,
								}}
							>
								<div className={styles.topCenter}>
									{loaderData.products
										.filter((content: Product) => content.isFavorite)
										.map((content: Product) => (
											<MenuCardPick product={content} key={content.id} />
										))}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.otherMenu}>
						<h2>その他のメニュー</h2>
						<div
							className={styles.cardback}
							style={{
								backgroundColor: loaderData.program.color,
							}}
						>
							<div className={styles.cards}>
								{loaderData.products
									.filter((content: Product) => !content.isFavorite)
									.map((content: Product) => (
										<MenuCard
											product={content}
											classNumber={loaderData.program.class}
											key={content.id}
										/>
									))}
							</div>
						</div>
					</div>
					{/* <h2>試作品用欄</h2>
					<OrderCard productData={order(loaderData)[0]}/>
					<SelectCard productData={select(loaderData)[0]}/>
					<SelectCardPick /> */}
				</div>
				<Button
					onPress={() => alert("この先は1日目から使用できます！")}
					style={{
						backgroundColor: loaderData.program.color,
						border: "none",
						boxShadow: "0px 0px 3px 3px var(--semantic-shadow-default)",
					}}
				>
					<p>商品をメモする</p>
				</Button>
				<div className={styles.place}>
					<h1>販売場所</h1>
				</div>
				<div className={styles.crowded}></div>
			</div>
		</>
	);
}
