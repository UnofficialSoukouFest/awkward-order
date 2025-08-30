import DetailsCard from "~/component/card/details-card";
import MinimalCard from "~/component/card/minimal-card";
import styles from "./home.module.css";

export function meta() {
	return [
		{ title: "Awkward-Order for YSF - 食販サイト" },
		{
			name: "description",
			content: "食販企画のメニューや注文の確認ができます",
		},
	];
}

export default function Home() {
	return (
		<>
			<div className={`${styles.topVisualContainer} overlayContent`}>
				<div id="top_visual" className={styles.topVisual}>
					<img
						className={styles.topImage}
						src="/unanimated_topvisual.png"
						alt=""
						width={750}
						height={1334}
					/>
				</div>
				<div className={styles.top_visual_info}>
					<p className={styles.subtitle}>Yokohama Science High School 文化祭企画団体</p>
					<p className={styles.title}>
						3年食販企画<br />
						特集サイト
					</p>
					<p className={styles.infoText}>9月6日/7日　10時15分整列開始</p>
					<p className={styles.infoText}>
						@サイエンスフロンティア高校<br />
						コミュニケーションコート
					</p>
				</div>
			</div>
			<h2 className={`${styles.mainHeading} ${styles.mainHeading1}`}>3年食販企画一覧</h2>
			<div className={`${styles.cardContainer} overlayContent`}>
				<div className={styles.cardWrapping}>
					<MinimalCard classNumber={1} title={`POP\nMART`} />
					<MinimalCard classNumber={2} title={`激ウマ\nフロート`} />
					<MinimalCard classNumber={3} title={`木薯軒`} />
					<MinimalCard classNumber={4} title={`買って\nクレープ`} />
					<MinimalCard classNumber={5} title={`やきトリノ\nサウルス`} />
					<MinimalCard classNumber={6} title={`Waffle-\n puff`} />
					<DetailsCard>
						<h2 className={styles.detailsContent}>メニューの一覧</h2>
						<p className={styles.detailsContent}>6団体すべての商品を見るならこちら！</p>
					</DetailsCard>
				</div>
			</div>
			<div className={styles.mapContainer}>
				<h2 className={styles.mainHeading}>販売場所</h2>
				{/* TODO: 校内地図コンポーネントを挿入 */}
			</div>
		</>
	);
}
