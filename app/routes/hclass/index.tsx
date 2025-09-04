import { Button } from "@latimeria/ganoine";
import { data } from "react-router";
import { MenuCard, MenuCardPick } from "~/component/card/menu-card";
import Image from "~/component/image";
import { TitleBarWithBack } from "~/component/title-bar";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types/index";
import styles from "./programs.module.css";
import { OrderCard } from "~/component/card/order-card";
import { SelectCard, SelectCardPick } from "~/component/card/select-card";

export async function loader({ params, context }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classId),
	});
	if (programResult.type === "error") {
		throw data(programResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, [
		{
			classId: Number(params.classId),
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
				themeColor="var(--themecolor-main)"
				textColor="var(--semantic-text-white)"
			/>
			<div className={styles.body}>
				<div className={styles.pr}>
					{/* TODO：データベースから各クラス向けに引用してくる。データベースにはテキストと画像パスは定義されていないので今はこれが限界 */}
					<img
						alt="クラスのPR画像"
						style={{ backgroundColor: "var(--themecolor-main)" }}
					/>
					<p>
						1階コミュニケーションコート鶴見川側にて焼き鳥を販売中！塩味とたれ味の二種類を取り扱っています。我々にはあるのだよ！美味しさへの確かな自信がな！それ故に、売り切れ御免！お早めにな！
					</p>
				</div>
				<div className={styles.menu}>
					<h1>メニュー</h1>
					<div className={styles.topMenu}>
						<h2>激推しメニュー</h2>
						<div className={styles.topCards}>
							<div
								className={styles.topBack}
								style={{ backgroundColor: "var(--themecolor-main)" }}
							>
								<div className={styles.topCenter}>
									<MenuCardPick />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.otherMenu}>
						<h2>その他のメニュー</h2>
						<div
							className={styles.cardback}
							style={{ backgroundColor: "var(--themecolor-main)" }}
						>
							<div className={styles.cards}>
								<MenuCard />
							</div>
						</div>
					</div>
					<h2>試作品用欄</h2>
					<OrderCard />
					<SelectCard />
					<SelectCardPick />
				</div>
				<Button
					onPress={() => alert("まだ繋がっていません！")}
					style={{
						backgroundColor: "var(--themecolor-main)",
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
