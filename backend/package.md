🎯 全体図（3 層の責務分離）
src/
├── api/          ←外界（HTTP）の入り口。Controller & Routes
├── application/  ←ユースケース（目的）。domain を利用する側。
├── domains/      ←ビジネスルール（認証方式・集約・値オブジェクト）
└── sharedTech/   ←技術系（Prisma / JWT / Logger / Mail）。


それぞれに明確な役割があるため、同じ軸で分類しないことが重要。

🏛 1. domains（ドメイン層）
🎯 目的

ビジネスルールを保持する。認証方式などの「概念（概念的区分）」で整理される。

domains/
├── auth/
│   ├── password/
│   │   ├── domain/（Entity / Aggregate / VO / Domain Events）
│   │   └── infrastructure/（PasswordUser の Repo）
│   ├── oauth/（Google / LINE / Apple）
│   ├── biometric/
│   └── sharedAuth/
│       ├── domain/event/
│       ├── model/valueObject/
│       ├── service/
│       └── infrastructure/security/
├── user/
│   ├── domain/（User AggregateRoot, VO）
│   └── infrastructure/repository/
└── schedule/
    ├── activity/
    ├── participation/
    └── sharedSchedule/

🔑 特徴

認証方式ごとに分かれている（password / oauth / biometric）

User 集約は user ドメインに集約される

domain 層は「技術」でも「ユースケース」でもなく
純粋なビジネス概念のまとまりである。

❌ login / signup の区分は domain には出てこない

理由：
login / signup は “ユーザー操作の目的” であり “ビジネス上の概念” ではないため。

🧠 2. application（アプリケーション層）
🎯 目的

ユーザーストーリー実行（UseCase）。
domain のモデルを使って目的を達成する層。

application/
├── auth/
│   ├── login/
│   │   ├── password/LoginPasswordUserUseCase.ts
│   │   ├── google/LoginGoogleUserUseCase.ts
│   │   └── line/LoginLineUserUseCase.ts
│   └── signup/
│       ├── password/SignUpPasswordUserUseCase.ts
│       ├── google/SignUpGoogleUserUseCase.ts
│       └── line/SignUpLineUserUseCase.ts
├── user/
│   ├── updateProfile/
│   ├── updateNotification/
│   └── changeRole/
├── schedule/
│   └── activity/
│       ├── CreateActivityUseCase.ts
│       ├── UpdateActivityUseCase.ts
│       └── CancelActivityUseCase.ts
└── audit/
    └── log/RecordAuditLogUseCase.ts

🔑 特徴

ユースケース（目的）単位 で分ける

login

signup

updateProfile

changeRole

createActivity
…など

domain の構造に引きずられない

同じ login でも内部で使う domain が違う

login/password → domain.auth.password

login/google → domain.auth.oauth

🌐 3. api（プレゼンテーション層）

HTTP Controller / Router は application のフォルダ構成に寄せる。

api/
├── front/
│   └── auth/
│       ├── login/password/
│       ├── login/google/
│       └── signup/password/
├── integration/
│   └── audit/log/
├── _usecaseFactory.ts
└── server.ts

🔑 特徴

application（ユースケース）に合わせた構造

/v1/auth/login/password

/v1/auth/signup/google
→ Controller が usecase を呼ぶだけ

⚙ sharedTech（技術基盤）
sharedTech/
├── db/PrismaClient
├── security/JwtTokenService
├── logger/
└── mail/


DDD では domain と隔離しておくのが鉄則。

🧩 domain と application の構造が異なるのは正常
✔ domain は 概念（方式・モデル）ベース
✔ application は ユースケース（目的）ベース
✔ api は application に寄せる

→ 3層で軸が違うため、構造が一致しない。
→ むしろ一致させたら設計として崩壊する。

🎯 まとめ：フォルダ構成の原則
層	分類軸	例
domain	方式・概念	password / oauth / user
application	目的（UseCase）	login / signup / updateProfile
api	application に合わせる	/auth/login/password
sharedTech	技術	Prisma / JWT
📌 この構造のメリット

認証方式が増えても domain を汚さない

login/signup が増えても domain を汚さない

domain のモデル変更が API に漏れにくい

application 層が「脂肪（fat layer）」となり拡張性が増す

Clean Architecture + DDD のベストプラクティス