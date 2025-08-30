import { data } from "react-router";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types/index";
import { Button } from "@latimeria/ganoine"
import styles from "./programs.module.css"
import { TitleBar } from "~/component/title-bar"
import MenuCard from "~/component/card/menu-card"
import MenuCardPick from "~/component/card/menu-card-pickup"

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
	id: number
	name: string
	price: number
}

export default function HClass({ loaderData }: Route.ComponentProps) {
	return (
        <div className={styles.body}>
			<h1>{ loaderData.program.name }</h1>
			<TitleBar pagename={loaderData.program.name} themeColor="#1ACACA"/>
            <div className={styles.pr}>
                {/* TODO：データベースから各クラス向けに引用してくる。データベースにはテキストと画像パスは定義されていないので今はこれが限界 */}
                <img />
                <p>1階コミュニケーションコート鶴見川側にて焼き鳥を販売中！塩味とたれ味の二種類を取り扱っています。我々にはあるのだよ！美味しさへの確かな自信がな！それ故に、売り切れ御免！お早めにな！</p>
            </div>
            <div className={styles.menu}>
                <h1>メニュー</h1>
                <div className={styles.topMenu}>
                    <h2>激推しメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。少し大きめのカードにする。 */}
					<MenuCardPick />
                </div>
                <div className={styles.otherMenu}>
                    <h2>その他のメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。通常サイズ。横2 ✕ 縦nで配置。 */}
					<div className={styles.cards}>
						{loaderData.products.map((product: productKind) => (
							<MenuCard product={ loaderData.products } key={product.id} />
						))}
					</div>
				</div>
            </div>
			<Button >
				<p>商品を選択する</p>
			</Button>
			<div className={styles.place}>
				<h1>販売場所</h1>
			</div>
			<div className={styles.crowded}></div>
        </div>
);
}

/* import { MenuCard } from "~/component/card/menu-card"
{loaderData.products.map(detail => (
						<MenuCard key={ detail.name } product={ detail } />
					))} 
<Button>
	<p>
		商品を選択する
	</p>
</Button>
<TitleBar pagename={loaderData.program.name} themeColor=""/>
*/
