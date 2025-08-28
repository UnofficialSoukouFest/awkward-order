import styles from "./programs.module.css"
//menucardはcomponentに作って後でゴニョゴニョ
//pr文・写真だけ左揃えにする
//最初のdivは空タグでもいいのか？
export default function(){
    return(
        <div>
            <div className="">
                <div className="pr">
                    <img>
                    </img>
                </div>
                <div className="menu">
                    <></>
                </div>
            </div>
        </div>
    )
}