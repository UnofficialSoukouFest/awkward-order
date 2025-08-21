import { type Location, useLocation } from "react-router";
import { type Product, sumProductsPrices } from "~/lib";
import { QRCodeSVG } from "qrcode.react";

export default function order() {
	const selected: Location<{ products: Product[] }> = useLocation();
	const products = selected.state.products;
	return (
		<div className="order">
			<h2>選択したもの</h2>
			<p>値段は{sumProductsPrices(products)}</p>
			<ul>
				{products.map((item) => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>

			<QRCodeSVG value={JSON.stringify(products)} />
		</div>
	);
}
