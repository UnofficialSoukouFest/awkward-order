import styles from "./menu-card.module.css"
export default function MenuCard( info ){
    return(
        <div className={styles.menuCard}>
            <img src={info.image} alt={info.name} />
            <div className={styles.cardText}>
                <p className={styles.menuName}>{info.name}</p>
                <p className={styles.price}>{info.price}</p>
            </div>
        </div>
    )
}