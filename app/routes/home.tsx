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
			{/* TODO: 旧サイトからトップ画面拝借してきたので独自版に変更 */}
			<div id="top_visual" className={styles.topVisualContainer}>
				<img
					className={styles.topImage}
					src="/ysf_top.png"
					alt="横浜サイエンスフロンティア高校の画像です"
					width={780}
					height={450}
				/>

				<div className={`${styles.top_cover}`}></div>

				<div className={styles.topInfoContainer}>
					<p className={styles.headText}>蒼煌祭食販HP</p>
				</div>

				<div className={styles.subInfoContainer}>
					<p className={styles.subtitle}>17th SOKO-FESTIVAL</p>
					<h1 className={styles.title}>
						蒼煌祭
						<span className={styles.title_thin}>「</span>澄
						<span className={styles.title_thin}>」</span>
					</h1>
					<p className={styles.titleInfo}>@YSFH・YSFJH</p>
					<p className={styles.titleInfo}>9/6 - 9/7 10:00≫15:00</p>
				</div>
			</div>
			<div className={styles.cardContainer}>
				{[1, 2, 3, 4, 5, 6].map((v) => (
					<MinimalCard classNumber={v} title={`${v}組の食販`} key={v} />
				))}
			</div>
			<div className={styles.detailsCardContainer}>
				<DetailsCard>
					<h2>メニューの一覧</h2>
					<p>6団体すべての商品を見るならこちら！</p>
				</DetailsCard>
			</div>
			<div className={styles.mapContainer}>
				<h2>販売場所</h2>
				{/* TODO: 校内地図コンポーネントを挿入 */}
			</div>
			<div className={styles.mapContainer}>
				<h2>アクセス</h2>
				{/* TODO: Google Mapで学校へのアクセス埋め込み */}
			</div>
		</>
	);
}
