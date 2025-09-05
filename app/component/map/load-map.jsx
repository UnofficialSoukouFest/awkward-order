import { lazy, Suspense } from "react";
import YSFMap from "./ysfmap.client";

/**
 * どこでも使えるマップ
 * @param {Object} prop
 * @param {number?} [prop.width]
 * @param {number?} prop.height
 */
export function YMap({ width, height }) {
	const LazyMap = lazy(() => import("./ysfmap.client"));
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyMap picWidth={width} picHeight={height} />
		</Suspense>
	);
}

/**
 * 企画ページ向けのマップ
 * @param {Object} prop
 * @param {number} [prop.width]
 * @param {number} prop.height
 * @param {String} prop.id
 */
export function MapFromSpecRoom({ width, height, id }) {
	const LazyMap = lazy(() => import("./ysfmap.client"));
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<LazyMap
				picWidth={width}
				picHeight={height}
				id={id}
			/>
		</Suspense>
	);
}
