import { Button } from "@latimeria/ganoine";
import { data } from "react-router";
import { MenuCard, MenuCardPick } from "~/component/card/menu-card";
import { TitleBarWithBack } from "~/component/title-bar";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types/index";
import { Button } from "@latimeria/ganoine"
import styles from "./programs.module.css"
import { TitleBarWithBack } from "~/component/title-bar"
import { MenuCard, MenuCardPick } from "~/component/card/menu-card"
import { OrderCard } from "~/component/card/order-card";

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
	classId?: number
	id: number
	name: string
	price: number
}

export default function HClass({ loaderData }: Route.ComponentProps) {
	return (
        <div className={styles.body}>
			<TitleBarWithBack pagename={loaderData.program.name} themeColor="#0066cc" textColor="#FFFCFC" />
            <div className={styles.pr}>
                {/* TODO：データベースから各クラス向けに引用してくる。データベースにはテキストと画像パスは定義されていないので今はこれが限界 */}
                <img alt="クラスのPR画像"/>
                <p>1階コミュニケーションコート鶴見川側にて焼き鳥を販売中！塩味とたれ味の二種類を取り扱っています。我々にはあるのだよ！美味しさへの確かな自信がな！それ故に、売り切れ御免！お早めにな！</p>
            </div>
            <div className={styles.menu}>
                <h1>メニュー</h1>
                <div className={styles.topMenu}>
                    <h2>激推しメニュー</h2>
					{loaderData.products.map((product: productKind) => (
						<MenuCardPick product={ product } key={ product.id } />
					))}
                </div>
                <div className={styles.otherMenu}>
                    <h2>その他のメニュー</h2>
					<div className={styles.cards}>
						{loaderData.products.map((product: productKind) => (
							<MenuCard product={ product } key={ product.id } />
						))}
					</div>
				</div>
            </div>
			<Button onPress={()=> alert("まだ繋がっていません！")}>
				<p>商品を選択する</p>
			</Button>
			<div className={styles.place}>
				<h1>販売場所</h1>
			</div>
			<div className={styles.crowded}></div>
		</div>
	);
}
