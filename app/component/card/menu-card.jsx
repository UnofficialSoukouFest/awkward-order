import styles from "./menu-card.module.css"
export default function MenuCard(){
    return(
        <div className={styles.menuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>メニュー名＊＊＊＊＊＊＊＊＊</p>
                <p className={styles.price}>100円</p>
            </div>
        </div>
    )
}