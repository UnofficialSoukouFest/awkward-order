import { Link } from "react-aria-components";
import { useNavigate } from "react-router";
import MdiArrowBack from "~icons/mdi/arrow-back";
/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from "./title-bar.module.css";

export type TitleProps = {
	pagename: string;
	themeColor: string;
	textColor: string;
};

export type PageNameProps = {
	pagename: string;
	themeColor: string;
	textColor: string;
	isBack: boolean;
};

/**
 * 上部のページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 * @param textColor - 文字色
 */
export function TitleBar({ pagename, themeColor, textColor }: TitleProps) {
	return (
		<header className={styles["title-bar"]}>
			<Title
				pagename={pagename}
				themeColor={themeColor}
				textColor={textColor}
				isBack={false}
			/>
		</header>
	);
}

/**
 * 上部の戻るボタン＋ページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 * @param textColor - 文字色
 */
export function TitleBarWithBack({
	pagename,
	themeColor,
	textColor,
}: TitleProps) {
	return (
		<header
			className={styles["title-bar-b"]}
			style={{
				backgroundColor: themeColor,
			}}>
			<BackButton arrowColor={textColor} backColor={themeColor} />
			<Title
				pagename={pagename}
				themeColor={themeColor}
				textColor={textColor}
				isBack={true}
			/>
		</header>
	);
}

/**
 * ページ名
 * @param pagename - ページ名
 * @param themeColor - テーマカラー
 * @param textColor - 文字色
 * @param isBack - バックボタンつきかどうか
 */
function Title({ pagename, themeColor, textColor, isBack }: PageNameProps) {
	const blank: number = isBack ? 36 : 0;
	return (
		<div
			className={styles["page-title"]}
			style={{
				color: textColor,
				fontSize: Math.min(Math.max(24, 320 / pagename.length), 32),
				paddingRight: blank,
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
function BackButton({ arrowColor, backColor }: { arrowColor: string, backColor: string }) {
	const router = useNavigate();
	return (
		<Link onPress={() => router(-1)} className={styles["back-button"]}>
			<MdiArrowBack fontSize={44} color={arrowColor} />
		</Link>
	);
}
