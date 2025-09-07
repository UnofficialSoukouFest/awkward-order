import DetailsCard from "~/component/card/details-card";
import MinimalCard from "~/component/card/minimal-card";
import Image from "~/component/image";
import { YMap } from "~/component/map/load-map";
import styles from "./home.module.css";
import { Link } from "@latimeria/ganoine";

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
					<Image
						className={styles.topImage}
						src="/unanimating_topvisual.png"
						alt=""
						width={750}
						height={1334}
					/>
				</div>
				<div className={styles.top_visual_info}>
					<p className={styles.subtitle}>
						Yokohama Science High School 文化祭企画団体
					</p>
					<p className={styles.title}>
						3年食販企画
						<br />
						特集サイト
					</p>
					<p className={styles.infoText}>9月6日/7日　10時15分整列開始</p>
					<p className={styles.infoText}>
						@サイエンスフロンティア高校
						<br />
						コミュニケーションコート
					</p>
				</div>
			</div>
			<h2 className={`${styles.mainHeading} ${styles.mainHeading1}`}>
				3年食販企画一覧
			</h2>
			<div className={`${styles.cardContainer} overlayContent`}>
				<div className={styles.cardWrapping}>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class1.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>1組</span>
							<h2 className={styles.titleC}>POP<br />MART</h2>
						</div>
					</Link>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class2.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>2組</span>
							<h2 className={styles.titleC}>激ウマ<br />フロート</h2>
						</div>
					</Link>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class3.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>3組</span>
							<h2 className={styles.titleC}>木薯軒</h2>
						</div>
					</Link>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class4.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>4組</span>
							<h2 className={styles.titleC}>買って<br />クレープ</h2>
						</div>
					</Link>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class5.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>5組</span>
							<h2 className={styles.titleC}>やきトリノ<br />サウルス</h2>
						</div>
					</Link>
					<Link href={`/1`} className={styles.cardLink}>
						<div className={`${styles.cardImg} ${styles.cardContent}`}>
							<Image
								className={styles.backImage}
								src="/PR.class6.png"
								alt=""
								width={156}
								height={156}
							/>
							<span className={styles.class}>6組</span>
							<h2 className={styles.titleC}>Waffle-<br />puff</h2>
						</div>
					</Link>
					<DetailsCard>
						<h2 className={styles.detailsContent}>メニューの一覧</h2>
						<p className={styles.detailsContent}>
							6団体すべての商品を見るならこちら！
						</p>
					</DetailsCard>
				</div>
			</div>
			<iframe
				className={styles.slide}
				title="食販の使い方"
				src="https://docs.google.com/presentation/d/e/2PACX-1vRSvoPrrU09BtDllWGcO3DX-EMw352OwDCt9hkw02RBTGMx-iumWjVnqMANDBV99leJqEyKKtKIeyIi/pubembed?start=false&loop=false&delayms=5000"
				width={320}
				height={190}
				allowFullScreen={true}
				allow="fullscreen"
			></iframe>
			<div className={styles.mapContainer}>
				<h2 className={styles.mainHeading}>販売場所</h2>
				<div className={styles.YSFmap}>
					<YMap height={300} />
				</div>
			</div>
		</>
	);
}
