import { Image } from "@unpic/react";
import type { ComponentPropsWithoutRef } from "react";

const IMAGE_HOST_URL = import.meta.env.DEV
	? "http://localhost:5173"
	: "https://assets-proxy.kanium.workers.dev/image";

export type AImageProps = {
	src?: string;
	width?: number;
	height?: number;
	quality?: number;
	format?: string;
	alt: string;
} & Omit<ComponentPropsWithoutRef<"img">, "src">;

export default function AImage(props: AImageProps) {
	const imageURL = `${IMAGE_HOST_URL}${props.src}`;
	return (
		<Image
			{...props}
			src={imageURL}
			width={props.width ?? 0}
			height={props.height ?? 0}
			alt={props.alt}
			layout="constrained"
		/>
	);
}
