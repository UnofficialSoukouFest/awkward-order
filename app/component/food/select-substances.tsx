import { useAtom } from "jotai";
import type { Dispatch, SetStateAction } from "react";
import {
	Collection,
	Header,
	ListBox,
	ListBoxItem,
	ListBoxSection,
} from "react-aria-components";
import { type SpecificSubstance, specificSubstanceList } from "~/lib/allergen";
import { allergySelectAtom } from "../../routes/select/atom";
import styles from "./select-substances.module.css";

/**
 * アレルゲン選択コンポーネント。
 */
export function SelectSubstance(
	/*{
	selected,
	setSelected,
}: {
	selected: Set<number>;
	setSelected: ; //: Dispatch<SetStateAction<Set<number>>>;
} */
) {
	const specificSubstanceTable = [
		{ name: "アレルゲンを選択", children: [] as SpecificSubstance[] },
		{ name: "特定原材料8品目", children: [] as SpecificSubstance[] },
		{ name: "特定原材料+20品目", children: [] as SpecificSubstance[] },
	];
	for (const specificSubstance of specificSubstanceTable) {
		if (specificSubstance.name === "アレルゲンを選択") {
			specificSubstance.children.push({
				id: 0,
				name: `${specificSubstanceList.find((item) => item.id === 0)?.name}`,
			});
		} else if (specificSubstance.name === "特定原材料8品目") {
			for (let index = 1; index < 9; index++) {
				specificSubstance.children.push({
					id: index,
					name: `${specificSubstanceList.find((item) => item.id === index)?.name}`,
				});
			}
		} else if (specificSubstance.name === "特定原材料+20品目") {
			for (let index = 9; index < 29; index++) {
				specificSubstance.children.push({
					id: index,
					name: `${specificSubstanceList.find((item) => item.id === index)?.name}`,
				});
			}
		}
	}

	const [selected, setSelected] = useAtom(allergySelectAtom);

	if ([...selected].length > 1 && [...selected][[...selected].length - 1] == 0)
		// 複数選択されていて、かつ、「選択しない」が選択されたとき、それ以外の選択を外す
		setSelected(new Set([0]));
	else if ([...selected].length === 0)
		// 何も選択されていなかったら「選択しない」を選択する
		setSelected(new Set([0]));
	if ([...selected].length > 1 && [...selected][0] == 0)
		// 「選択しない」以外が選択されたら「選択しない」から選択を外す
		setSelected(new Set([...selected].filter((item) => item != 0)));

	return (
		<div className={styles.dialogBox}>
			<h1>アレルギーフィルター</h1>
			<p>
				以下の28品目から選択されたアレルゲンが使われていないメニューを表示します(複数選択可)。
			</p>
			<ListBox
				aria-label="アレルゲン"
				selectionMode="multiple"
				selectedKeys={selected}
				onSelectionChange={setSelected}
				className={styles.listBox}
			>
				{specificSubstanceTable.map((item) => (
					<ListBoxSection
						id={item.name}
						className={styles.reactAriaListBoxSection}
						key={item.name}
					>
						<Header className={styles.reactAriaHeader}>{item.name}</Header>
						<Collection>
							{item.children.map((itemc) => (
								<ListBoxItem
									className={styles.items}
									id={itemc.id}
									key={itemc.name}
								>
									{itemc.name}
								</ListBoxItem>
							))}
						</Collection>
					</ListBoxSection>
				))}
			</ListBox>
			<p style={{ paddingLeft: "0em" }}>
				△...調理工程で混入する可能性があります
			</p>
			<p style={{ paddingLeft: "0em" }}>
				ー...調理工程での混入の可能性は限りなく低いです
			</p>
		</div>
	);
}
