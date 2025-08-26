# デザインに関して
プログラム面から、デザインについて記述します。

## 12-span grid
ref: https://web.dev/patterns/layout/twelve-span-grid
全体を12-span gridで構造を取ってます。レスポンシブ対応を考慮した上で試験的に使ってみました。
幅を指定するときは`grid-column`プロパティで指定してください。
例: 要素が全幅取るとき
```css
.element {
    grid-column: 1 / 13 /* OR 1 / span 12 */
}
```

