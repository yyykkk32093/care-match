import { randomUUID } from 'crypto'

/**
 * アプリケーションイベントの基底クラス
 * 
 * ✔ UseCase の “結果” を表す
 * ✔ 状態変化は含まない
 * ✔ DomainEvent とは完全に別物
 */
export abstract class ApplicationEvent {
    readonly id: string
    readonly eventName: string
    readonly occurredAt: Date

    protected constructor(eventName: string) {
        this.id = randomUUID()
        this.eventName = eventName
        this.occurredAt = new Date()
    }
}
