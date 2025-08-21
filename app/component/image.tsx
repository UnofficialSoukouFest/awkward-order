import type { ComponentPropsWithRef } from "react";

const IMAGE_HOST_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:3000"
		: "https://assets-proxy.kanium.workers.dev";

function buildImageUrl(
	src: string,
	width: number,
	quality?: number,
	format?: string,
) {
	const params = new URLSearchParams();
	params.set("width", String(width));
	params.set("quality", String(quality ?? 75));
	params.set("format", format ?? "auto");

	return `${IMAGE_HOST_URL}/${src}?${params.toString()}`;
}

export type ImageProps = {
	src: string;
	width: number;
	quality?: number;
	format?: string;
	alt: string;
} & Omit<ComponentPropsWithRef<"img">, "src">;

export default function Image(props: ImageProps) {
	return (
		<img
			{...props}
			src={buildImageUrl(props.src, props.width, props.quality, props.format)}
			alt={props.alt}
		/>
	);
}
