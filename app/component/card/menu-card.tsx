import styles from "./menu-card.module.css";

/*type ProductType = {
    classId?: number
    id: number
    name: string
    price: number
}

type MenuProps = {
    product: ProductType
}
*/

export function MenuCard(){
    return(
        <div className={styles.menuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>aaaaaaaa</p>
                <p className={styles.price}>aaaaaaaaa</p>
            </div>
        </div>
    )
}

export function MenuCardPick(){
    return(
        <div className={styles.pickMenuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.pickCardText}>
                <p className={styles.pickMenuName}>aaaaaaaaaa</p>
                <p className={styles.pickPrice}>aaaaaaaaa</p>
            </div>
        </div>
    )
}

export function MenuCardAll(){
    return(
        <div className={styles.allMenuCard}>
            <p>aaaaa</p>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>aaaaaaa</p>
                <p className={styles.price}>aaaaaaaaaa</p>
            </div>
        </div>
    )
}

/*
export function MenuCard( { product } : MenuProps ){
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

export function MenuCardPick( {product}: MenuProps ){
    return(
        <div className={styles.pickMenuCard}>
            <img alt="商品の画像です。" />
            <div className={styles.pickCardText}>
                <p className={styles.pickMenuName}>{product.name}</p>
                <p className={styles.pickPrice}>{product.price}</p>
            </div>
        </div>
    )
}

export function MenuCardAll( {product}: MenuProps ){
    return(
        <div className={styles.allMenuCard}>
            <p>{product.classId}</p>
            <img alt="商品の画像です。" />
            <div className={styles.cardText}>
                <p className={styles.menuName}>{product.name}</p>
                <p className={styles.price}>{product.price}</p>
            </div>
        </div>
    )
}
*/