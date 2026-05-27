# 韓国旅行のしおり

ソウル・釜山への韓国旅行をまとめたモバイル対応のWebしおりアプリです。

## 機能

- **日程タブ** — 4日間のスケジュールをタイムライン表示
- **情報タブ** — 緊急連絡先・おすすめアプリ・交通・両替情報
- **フレーズタブ** — よく使う韓国語（タップでクリップボードにコピー）
- **予算タブ** — 旅行費用の目安一覧

## 技術スタック

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- GitHub Pages（静的エクスポート）

## ローカルでの起動

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
```

`out/` フォルダに静的HTMLが生成されます。

## デプロイ

`main` ブランチにプッシュすると、GitHub Actions が自動でビルドして GitHub Pages に公開します。

## カスタマイズ

`app/data.ts` を編集して旅行情報を設定してください。

- `tripInfo` — タイトル・旅行日程・メンバー・緊急連絡先
- `days` — 日ごとのスケジュール
- `usefulPhrases` — 韓国語フレーズ
- `budgetItems` — 予算項目
