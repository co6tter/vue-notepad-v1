# vue-notepad-v1

## Overview

Vue 3 製のメモ帳アプリです。メモの作成・編集・削除・完了切替・アーカイブに対応し、カテゴリや優先度によるフィルタリング・検索機能を備えています。データはブラウザの LocalStorage に永続化されるため、バックエンド不要で動作します。

## Tech Stack

- [Vue 3](https://vuejs.org/) — UI フレームワーク
- [TypeScript](https://www.typescriptlang.org/) — 型安全な開発
- [Vite](https://vitejs.dev/) — ビルドツール
- [Pinia](https://pinia.vuejs.org/) — 状態管理
- [VueUse](https://vueuse.org/) — LocalStorage 永続化などのユーティリティ
- [Tailwind CSS v4](https://tailwindcss.com/) — スタイリング
- [Biome](https://biomejs.dev/) — Lint / Format
- [Lefthook](https://github.com/evilmartians/lefthook) — Git フック管理

## Prerequisites

- Node.js 22.x 以上（[mise](https://mise.jdx.dev/) での管理を推奨）
- [pnpm](https://pnpm.io/) 10.x 以上

## Setup

1. リポジトリをクローン:

   ```bash
   git clone https://github.com/co6tter/vue-notepad-v1.git
   cd vue-notepad-v1
   ```

2. 依存関係をインストール:

   ```bash
   pnpm install
   ```

3. Git フックを有効化:

   ```bash
   pnpm exec lefthook install
   ```

4. 開発サーバーを起動:

   ```bash
   pnpm dev
   ```

## Usage

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバーを起動 (http://localhost:5173) |
| `pnpm build` | 本番用ビルドを生成 (`dist/`) |
| `pnpm preview` | 本番ビルドをローカルでプレビュー |

### 主な機能

- **メモの追加**: テキストボックスに入力して Enter で追加
- **メモの編集**: 各メモの編集ボタンをクリック
- **完了切替**: チェックボックスで完了/未完了を切り替え
- **カテゴリ**: 仕事・プライベート・その他から分類
- **優先度**: 高・中・低の3段階で設定
- **検索**: キーワードでメモをフィルタリング
- **アーカイブ**: 不要なメモをアーカイブに移動

## Directory Structure

```
vue-notepad-v1/
├── src/
│   ├── components/   # Vue コンポーネント (MemoApp.vue)
│   ├── stores/       # Pinia ストア (memo.ts, category.ts)
│   ├── App.vue       # ルートコンポーネント
│   ├── main.ts       # エントリーポイント
│   └── style.css     # グローバルスタイル
├── public/           # 静的アセット
├── index.html        # HTML テンプレート
├── vite.config.ts    # Vite 設定
├── biome.json        # Biome 設定
└── lefthook.yml      # Git フック設定
```

## License

MIT
