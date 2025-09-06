import {
    Button,
    Link,
	Popup,
	PopupCloseButton,
	PopupProvider } from "@latimeria/ganoine";
import styles from "./popup-detail.module.css"
import type { Product } from "packages/shared/dist/src";

export function DetailPopup({ content, classNumber }:{content: Product, classNumber:number }){
    return(
        <PopupProvider>
            <Popup>
                <PopupCloseButton>閉じる</PopupCloseButton>
                <h2>{content.name}</h2>
                <h2>{content.price}</h2>
                <h3>企画："企画名"</h3>
                <h3>アレルギー</h3>
                <p>{content.allergens}</p>
                <h3>原材料</h3>
                <p>{content.ingredients}</p>
                <Button component="a" href={`/${classNumber}`}>この企画のページに移動する</Button>
            </Popup>
        </PopupProvider>
    )
}