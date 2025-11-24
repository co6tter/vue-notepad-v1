# Vue Notepad v1

## Overview

シンプルで使いやすいメモ帳アプリケーション。メモの作成、編集、削除、検索、カテゴリ分類、優先度設定などの機能を備えています。ローカルストレージを使用してデータを永続化し、ドラッグ&ドロップでメモの並び替えも可能です。

## Tech Stack

- **Vue 3** - プログレッシブJavaScriptフレームワーク
- **TypeScript** - 型安全な開発環境
- **Pinia** - Vue用の状態管理ライブラリ
- **Tailwind CSS 4** - ユーティリティファーストCSSフレームワーク
- **VueUse** - 便利なVue Composablesコレクション
- **Vite** - 高速なビルドツール
- **Biome** - リンター・フォーマッター

## Setup

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番環境向けビルド
npm run build

# ビルドしたアプリのプレビュー
npm run preview
```

## Usage

### 基本機能

- **メモの追加**: テキストボックスにメモを入力してEnterキーで追加
- **メモの編集**: 各メモの「編集」ボタンをクリック
- **メモの削除**: 各メモの「削除」ボタンをクリック
- **完了チェック**: チェックボックスでメモを完了状態に設定
- **カテゴリ**: 仕事、プライベート、買い物などのカテゴリから選択
- **優先度**: 高（🔴）、中（🟡）、低（🔵）の3段階で設定
- **検索**: 検索ボックスでメモをフィルタリング
- **並び替え**: ドラッグ&ドロップでメモの順序を変更
- **アーカイブ**: 不要になったメモをアーカイブして整理

### データの永続化

メモはブラウザのLocalStorageに自動保存されるため、ページを更新しても内容が保持されます。

## Directory Structure

```
vue-notepad-v1/
├── src/
│   ├── components/
│   │   └── MemoApp.vue       # メインのメモアプリコンポーネント
│   ├── stores/
│   │   ├── memo.ts           # メモの状態管理
│   │   └── category.ts       # カテゴリの状態管理
│   ├── App.vue               # ルートコンポーネント
│   ├── main.ts               # エントリーポイント
│   └── style.css             # グローバルスタイル
├── public/                   # 静的ファイル
└── package.json              # プロジェクト設定
```

## License

This repository is for personal/private use only.
