import styles from "./programs.module.css"
import { TitleBar } from "../../component/title-bar"
//menucardはcomponentに作って後でゴニョゴニョ
//pr文・写真だけ左揃えにする
//最初のdivは空タグでもいいのか？
export default function programs() {
    return(
        <div className={styles.body}>
            <TitleBar pagename="" themeColor=""/>
            <div className={styles.pr}>
                {/* TODO：データベースから各クラス向けに引用してくる。ここは引数を取ってmapしたほうがいいかも。 */}
                <img></img>
                <p></p>
            </div>
            <div className={styles.menu}>
                <h1>メニュー</h1>
                <div className={styles.topMenu}>
                    <h2>激推しメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。少し大きめのカードにする。 */}
                </div>
                <div className={styles.othermenu}>
                    <h2>その他のメニュー</h2>
                    {/* TODO：ここにcomponentでカードを作って挿入する。通常サイズ。横2 ✕ 縦nで配置。 */}
                </div>
                {/* TODO：ganoineのボタンをここに導入する。 */}
            </div>
        </div>
    )
}