# LLM WebUI

自分用のLLM webインターフェース。

- [Open WebUI](https://github.com/open-webui/open-webui): webインターフェース
- [LiteLLM](https://github.com/BerriAI/litellm): API管理
- [Ollama](https://ollama.com/): ローカルLLM管理

## 使い方

`.env`にAPIキーを設定して`run.sh`を実行する。

- Open WebUI: http://localhost:50011
- LiteLLM admin page: http://localhost:50012
- prometheus: http://localhost:50013

## その他

Perplexityは普通にAPIキー設定して使ってもいいけど、そうするとcitationがうまく表示されないので、Open WebUIのユーザ関数として`modules/perplexity_sonar_api_with_citations.py`を追加するといい。その場合APIキーはこの関数内に直接書く必要がある。
