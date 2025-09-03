import type { ComponentPropsWithoutRef } from "react";

const IMAGE_HOST_URL = "https://assets-proxy.kanium.me/image";

export type ImageProps = {
	src?: string;
	width?: number;
	height?: number;
	quality?: number;
	format?: string;
	alt: string;
	unoptimized?: boolean
} & Omit<ComponentPropsWithoutRef<"img">, "src">;

export default function Image(props: ImageProps) {
    let imageURL = `${IMAGE_HOST_URL}${props.src}${props.format ? `?format=${props.format}` : "?format=auto"}`;
	if (!props.unoptimized || props.unoptimized === undefined) {
		imageURL = imageURL.concat(`${props.width ? `&width=${props.width}` : ""}${props.quality ? `&quality=${props.quality}` : "&quality=75"}`)
	}
	return (
		<img
			{...props}
			src={imageURL}
			width={props.width ?? 0}
			height={props.height ?? 0}
			alt={props.alt}
		/>
	);
}
