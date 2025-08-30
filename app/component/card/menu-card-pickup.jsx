import styles from "./menu-card-pickup.module.css"
export default function MenuCardPick(){
    return(
        <div className={styles.menuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>激推しメニュー名＊＊＊＊＊＊＊＊＊＊</p>
                <p className={styles.price}>400円</p>
            </div>
        </div>
    )
}