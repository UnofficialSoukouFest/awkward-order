import { Link } from "react-aria-components";
import { useNavigate } from "react-router";
import MdiArrowBack from "~icons/mdi/arrow-back";
/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from "./title-bar.module.css";

export type TitleProps = {
	pagename: string;
	themeColor: string;
};

/**
 * 上部のページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 */
export function TitleBar({ pagename, themeColor }: TitleProps) {
	return (
		<header className={styles["title-bar"]}>
			<Title pagename={pagename} themeColor={themeColor} />
		</header>
	);
}

/**
 * 上部の戻るボタン＋ページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 */
export function TitleBarWithBack({ pagename, themeColor }: TitleProps) {
	return (
		<header className={styles["title-bar-b"]}>
			<BackButton arrowColor={themeColor} />
			<Title pagename={pagename} themeColor={themeColor} />
		</header>
	);
}

/**
 * ページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 */
function Title({ pagename, themeColor }: TitleProps) {
	return (
		<div
			className={styles["page-title"]}
			style={{
				color: themeColor,
				fontSize: Math.min(Math.max(24, 320 / pagename.length), 32),
			}}
		>
			<span>{pagename}</span>
		</div>
	);
}

/**
 * 左上の矢印戻るボタン
 * @param arrowColor - 矢印の色
 */
function BackButton({ arrowColor }: { arrowColor: string }) {
	const router = useNavigate();
	return (
		<Link onPress={() => router(-1)} className={styles["back-button"]}>
			<MdiArrowBack fontSize={44} color={arrowColor} />
		</Link>
	);
}
