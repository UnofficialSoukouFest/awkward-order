import styles from "./menu-card.module.css"
export default function menuCard( product ){
    return(
        <div className={styles.menuCard}>
            <img src={product.image} alt={product.name} />
            <div className={styles.cardText}>
                <p className={styles.menuName}>{product.name}</p>
                <p className={styles.price}>${product.price}</p>
            </div>
        </div>
    )
}