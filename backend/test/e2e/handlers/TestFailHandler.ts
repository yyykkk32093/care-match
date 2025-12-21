import { IntegrationHandler } from "@/integration/dispatcher/handler/IntegrationHandler.js";

export class TestFailHandler extends IntegrationHandler {
    async handle(): Promise<void> {
        throw new Error("Test-induced permanent failure");
    }
}
