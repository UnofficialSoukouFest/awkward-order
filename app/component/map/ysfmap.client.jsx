// @ts-check
import { CRS, LatLng } from "leaflet";
import { MapContainer } from "react-leaflet";
import SVGURL from "../../data/map/bg.svg";
import SVGRaw from "../../data/map/programs.svg?raw";

import "leaflet/dist/leaflet.css"; // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import "./leaflet-override.css"; // leaflet標準cssをオーバーライド
import { FloorLayer, gcenter } from "./layer.client";
import {
	Path2Polygon,
	SVGController,
	zoomRatioAndPaddings,
} from "./svg-controller";
import styles from "./ysfmap.module.css";

/**
 * 高さ、幅、初期表示階(、フォーカス対象の企画id)、部屋選択時に呼び出す関数をオプションで指定してYSF校内の地図を表示します。
 * @param {Object} props
 * @param {number?} [props.picHeight] 地図の表示高さ 指定がない場合は `window.innerHeight - 64`
 * @param {number?} [props.picWidth] 地図の表示幅 指定がない場合は `window.innerWidth`
 * @param {number} [props.initialFloor=1] 初期表示する階(1~6) 指定しなかった場合`1`
 * @param {String} [props.id] 初期フォーカス対象の企画id (指定する場合初期表示する階を正しく必ず指定して下さい)
 * @param {(ids: string[], layer: L.Polygon) => void} [props.onRoomClick] 部屋選択時に呼び出すコールバック関数\
 * 選択された部屋が持つ企画idの配列と、クリックした部屋の`L.Polygon`を受け取る。\
 * 指定しなかった場合デフォルトのポップアップが表示される。
 * @returns {React.ReactNode}
 */
export default function YSFMap({ picHeight, picWidth, id, onRoomClick }) {
	if (!picHeight) {
		picHeight = window.innerHeight - 64;
	}
	if (!picWidth) {
		picWidth = window.innerWidth * 0.9;
	}
	const svgController = new SVGController(SVGRaw);
	const svgSize = svgController.getSVGSize();
	const [zoomRatio, paddings] = zoomRatioAndPaddings(
		[picHeight, picWidth],
		svgSize,
	);

	let initZoom = 1.0;
	let center = [picHeight / 2 - 40, picWidth / 2];
	const polyPaddings = [
		picHeight / 2 - (picHeight / 2 + 40 - paddings[0]) * 2 ** initZoom,
		picWidth / 2 - (picWidth / 2 - paddings[1]) * 2 ** initZoom,
	];

	if (id) {
		const Room = svgController.matchedTagAndProperty("path", "id", (ids) => {
			// @ts-expect-error
			return ids.split(",").includes(id);
		})[0];
		if (Room) {
			initZoom = 1.5;
			// @ts-expect-error
			const [y, x] = gcenter(Path2Polygon(Room.properties["d"]));
			center = [
				picHeight - (y * zoomRatio + paddings[0]),
				x * zoomRatio + paddings[1],
			];
			polyPaddings[0] = picHeight / 2 - y * zoomRatio * 2 ** initZoom;
			polyPaddings[1] = picWidth / 2 - x * zoomRatio * 2 ** initZoom;
		}
	}

	return (
		<div className={styles.leafletMap}>
			<MapContainer
				crs={CRS.Simple}
				center={new LatLng(center[0], center[1])}
				zoom={initZoom}
				minZoom={0}
				maxZoom={2}
				zoomSnap={0.5}
				zoomDelta={0.5}
				style={{ height: picHeight, width: picWidth }}
				maxBounds={[
					[-picHeight * 0.5, -picWidth * 0.5],
					[picHeight * 1.5, picWidth * 1.5],
				]} // 自分を見失わないため
			>
				<FloorLayer
					src={SVGURL}
					raw={SVGRaw}
					picSize={[picHeight, picWidth]}
					// @ts-expect-error
					paddings={polyPaddings}
					zoomRatio={zoomRatio * 2 ** initZoom}
					onRoomClick={onRoomClick}
					// @ts-expect-error
					openId={id}
				/>
			</MapContainer>
		</div>
	);
}
