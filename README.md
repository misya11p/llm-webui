# LLM WebUI

自分用のLLM webインターフェース。

- [Open WebUI](https://github.com/open-webui/open-webui): webインターフェース
- [LiteLLM](https://github.com/BerriAI/litellm): API管理
- [Ollama](https://ollama.com/): ローカルLLM管理

## 使い方

1. `config.yaml`に利用したいモデルを記載する
2. `.env`にAPIキーを設定する
3. 任意のコマンド名で`entrypoint.sh`にaliasを通す
  - `llm-webui`というコマンド名を用いる場合: `alias llm-webui=path/to/llm-webui/entrypoint.sh`

これで、コマンド名+サブコマンドで操作可能となる。例えばサーバーを起動する場合は`llm-webui start`。サブコマンド一覧は以下:

- `start`: 起動
- `stop`: 停止
- `restart`: 再起動
- `update`: コンテナイメージの更新と再起動

サーバーを起動すると以下のURLに各種ページが立ち上がる:

- Open WebUI: http://localhost:50011
- LiteLLM admin page: http://localhost:50012
- prometheus: http://localhost:50013

## その他

Perplexityは普通にAPIキー設定して使ってもいいけど、そうするとcitationがうまく表示されないので、Open WebUIのユーザ関数として`modules/perplexity_sonar_api_with_citations.py`を追加するといい。その場合APIキーはこの関数内に直接書く必要がある。
