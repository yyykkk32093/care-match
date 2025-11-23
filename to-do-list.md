📌 Outbox → Integration → AuditLog 課題管理（最新版）
## A. Outbox / Integration / AuditLog 基盤
- [ ] 1. Outbox → Integration → AuditLog の実動作確認

Auth ログインから AuditLog 保存までの E2E 動作をまだ完全には検証できていない。

- [x] 2. OutboxEvent → IntegrationEvent のマッピング整理

eventName / eventType / routingKey の役割整理は完了。

- [ ] 3. Dispatcher / Handler の配置整理

現状 sharedDomains に置いているが、application 層への移動検討が必要。

B. Worker / Retry / ログ強化
- [x] 4. Worker ログ出力の追加

基本ログ（成功/失敗/ID）出力の実装済み。

- [ ] 5. エラーハンドリング強化

timeout / backoff / DeadLetter 等の実装は未完。

- [x] 6. RetryPolicy の拡張設計（※完了扱いに変更）

eventType ごとの maxRetries / interval の設計完了。
コード反映は進行中だが「設計としては完了」とする。

C. Prisma / DB / Migration
- [x] 7. schema.prisma の破損 → 再構築

migration reset → migrate dev により復旧済み。

D. Integration API 設計
- [x] 8. Integration API の単一入口整理

/integration/v1/audit/logs に統一済み。

- [ ] 9. Payload の標準化

DTO はできたが、Auth 以外のサービス拡張を見据えた完全標準化は未完。

E. フォルダ構造 / 実行方法 / 通信層
- [x] 10. Worker のビルド・実行方法確立

dist 生成 → startOutboxWorker.js の起動まで確認済み。

- [x] 11. IntegrationHandler の共通通信層（※完了扱いに変更）


🟩 完了（Done）

eventType / routingKey / eventName の整理

Prisma schema の修復

Migration と schema の同期

Worker 実行

Integration API 統一

RetryPolicy の设计

共通 HttpClient 導入

🟥 未完（ToDo）

E2E 結合テスト

Dispatcher/Handler のレイヤ整理

エラーハンドリングの強化

Payload 標準化（Auth 以外も対応可能に）

🔸 Integration API の冪等性 🔸 audit.log handler の最終整備 🔸 Outbox 監視画面 🔸 OutboxPublisher の見直し 🔸 Worker の SIGINT / graceful shutdown 動作確認 🔸 ログ標準化（logger の正式適用）