import styles from "./menu-card.module.css"

type productType = {
    id: number
    name: string
    price: number
}

type menuProps = {
    product: productType
}

export default function MenuCard( { product } : menuProps ){
    return(
        <div className={styles.menuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>{product.name}</p>
                <p className={styles.price}>{product.price}</p>
            </div>
        </div>
    )
}