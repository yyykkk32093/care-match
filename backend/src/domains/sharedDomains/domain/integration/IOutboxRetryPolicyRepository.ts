import { OutboxRetryPolicy } from "../../model/entity/OutboxRetryPolicy.js";


export interface IOutboxRetryPolicyRepository {
    findByRoutingKey(routingKey: string): Promise<OutboxRetryPolicy | null>
}
