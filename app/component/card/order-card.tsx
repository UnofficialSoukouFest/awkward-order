import styles from "./order-card.module.css";

export function OrderCard({product} : OrderType){
    return(
        <div className={styles.body}>
            <img alt="商品画像です。"/>
            <div className={styles.texts}>
                <p className={styles.name}>{product.name}</p>
                <div className={styles.values}>
                    <p className={styles.number}>{product.number}</p>
                    <p className={styles.price}>{product.price}</p>
                </div>
            </div>
        </div>
    )
}
