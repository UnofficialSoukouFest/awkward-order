# Awkward Order
蒼煌祭食販向けのwebアプリケーション

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

`http://localhost:5173`からサイトにアクセスできます。

### syncPublic

```bash
pnpm run syncPublic
```

このコマンドはgoogleドライブの蒼煌祭の画像フォルダの中身をダウンロードします。  
ローカルに存在していなかったり、ハッシュが異なるものだけをダウンロードできるようになっています。  
動かすには以下の手順が必要です。

1. `latimeria.config.jsonc.template`を`latimeria.config.jsonc`にリネーム
2. Google Cloud コンソールで、Google Drive API を有効化
3. OAuthの有効化
4. [対象](https://console.cloud.google.com/auth/audience)にて、テストユーザーに自分のメアドを追加
5. ホームディレクトリ(このファイルの属する階層)に`credentials.json`を配置
6. コマンドを実行するとOAuthの許可画面が出てくるので許可する

1,2の手順は[これ](https://developers.google.com/workspace/drive/api/quickstart/nodejs?hl=ja)の通りにやるといいです。  
あと、学校アカウントではテストしていないのでご了承下さい。多分動かないです