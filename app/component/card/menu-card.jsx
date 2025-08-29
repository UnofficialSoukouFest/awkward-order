import styles from "./menu-card.module.css"
export default function menuCard(){
    return(
        <div className={styles.menuCard}>
            <img></img>
            <div className={styles.cardText}>
                <p className={styles.menuName}></p>
                <p className={styles.price}></p>
            </div>
        </div>
    )
}