# Assets-proxy

画像等のファイルをR2から配信するためのAPIサーバーです。

## Development
開発時は`pnpm run dev`で起動します。初期起動時は`pnpm run cf-typegen`を実行することを推奨します。
機密情報は`.dev.vers`に記載します。ファイルの内容は以下のように記載します。`API_TOKEN`は任意のトークンを設定してください。
```env
API_TOKEN=<YOUR_CUSTOM_API_TOKEN>
```