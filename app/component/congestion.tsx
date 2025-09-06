// INFO: このファイルのコードは食販のデータに強く依存しています
import type { Program } from "@latimeria/shared";
import useSWR, { type Fetcher } from "swr";
import CongrestionFew from "~/data/congrestion_few.svg?react";
import CongrestionFull from "~/data/congrestion_full.svg?react";
import CongrestionHalf from "~/data/congrestion_half.svg?react";
import CongrestionMany from "~/data/congrestion_many.svg?react";

const BASE_CONGESTION_API_URL = "https://csmonitor3.onrender.com/food_cs_api";

const fetcher: Fetcher<
	{ data: TotalCongestionData },
	{ url: string; params: Record<string, string> }
> = ({ url, params }) =>
	fetch(`${BASE_CONGESTION_API_URL}${url}?${new URLSearchParams(params)}`).then(
		(r) => r.json(),
	);

export type CongestionData = {
	program_name: string;
	room_name: string;
	level: number;
	reliability: number;
};

export type TotalCongestionData = {
	"1": CongestionData;
	"2": CongestionData;
	"3": CongestionData;
	"4": CongestionData;
	"5": CongestionData;
	"6": CongestionData;
};

export function Congestion({ program }: { program: Program }) {
	const { data, error, isLoading } = useSWR(
		{
			url: "/",
			params: {
				format: "json",
			},
		},
		fetcher,
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>混雑率の取得に失敗しました</p>;
	}
	switch (program.class) {
		case 1: {
			const dataForClass = data?.data[1];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		case 2: {
			const dataForClass = data?.data[2];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		case 3: {
			const dataForClass = data?.data[3];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		case 4: {
			const dataForClass = data?.data[4];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		case 5: {
			const dataForClass = data?.data[5];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		case 6: {
			const dataForClass = data?.data[6];
			if (!dataForClass) {
				return <p>混雑率の取得に失敗しました</p>;
			}
			return CongestionStatus(dataForClass);
		}

		default:
			break;
	}
}

function CongestionStatus(data: CongestionData) {
	switch (data.level) {
		case 5:
			return <CongrestionFull />;

		case 4:
			return <CongrestionMany />;

		case 3:
			return <CongrestionHalf />;

		case 2:
			return <CongrestionFew />;

		case 1:
			return <CongrestionFew />;

		default:
			break;
	}
}
