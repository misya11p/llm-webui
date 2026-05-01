# LLM WebUI

自分用のLLM webインターフェース。

- [Open WebUI](https://github.com/open-webui/open-webui): webインターフェース
- [Bifrost](https://github.com/maximhq/bifrost): API管理
- [Ollama](https://ollama.com/): ローカルLLM管理

## 使い方

1. `config.yaml`に利用したいモデルを記載する
2. `.env`にAPIキーを設定する
3. 任意のコマンド名で`entrypoint.sh`にaliasを通す。サブコマンドは以下:

- `start`: 起動
- `stop`: 停止
- `restart`: 再起動
- `update`: コンテナイメージの更新と再起動

サーバーを起動すると以下のURLに各種ページが立ち上がる:

- Open WebUI: http://localhost:50011
- Bifrost admin page: http://localhost:50012
- prometheus: http://localhost:50013
