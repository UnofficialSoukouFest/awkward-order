import { data } from "react-router";
import { matchProducts } from "~/lib/product";
import { matchProgram } from "~/lib/program";
import type { Route } from "./+types/index";
import { Button } from "@latimeria/ganoine"
import style from "./programs.module.css"
import { menuCard } from "~/component/card/menu-card"

export async function loader({ params, context }: Route.LoaderArgs) {
	const programResult = await matchProgram(context.db, {
		class: Number(params.classId),
	});
	if (programResult.type === "error") {
		throw data(programResult.payload, { status: 500 });
	}
	const productResult = await matchProducts(context.db, {
		classId: Number(params.classId),
	});
	if (productResult.type === "error") {
		throw data(productResult.payload, { status: 500 });
	}
	return {
		program: programResult.payload,
		products: productResult.payload,
	};
}

export default function HClass({ loaderData }: Route.ComponentProps) {
	return (
		<>
		<h1>{loaderData.program.name}</h1>
        <div className={styles.body}>
            <TitleBar pagename={loaderData.program.name} themeColor=""/>
            <div className={styles.pr}>
                {/* TODO：データベースから各クラス向けに引用してくる。ここは引数を取ってmapしたほうがいいかも。 */}
                <img></img>
                <p></p>
            </div>
            <div className={styles.menu}>
                <h1>メニュー</h1>
                <div className={styles.topMenu}>
                    <h2>激推しメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。少し大きめのカードにする。 */}
                </div>
                <div className={styles.othermenu}>
                    <h2>その他のメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。通常サイズ。横2 ✕ 縦nで配置。 */}
					{loaderData.products.map(product => (
						<menuCard key={products.name} product={products} />
					))}
                </div>
                <Button>
					<p>
						商品を選択する
					</p>
				</Button>
            </div>
        </div>
		</>
);
}
