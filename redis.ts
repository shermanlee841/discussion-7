
import { createClient, RedisClientType } from "redis";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error("Redis URL is required");
}

let client: RedisClientType | null = null;
let connectPromise: Promise<RedisClientType> | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
    if (!client) {
        client = createClient({ url: REDIS_URL });
        client.on("error", (err) => {
            console.error("Redis error:", err);
        });
    }

    if (!client.isOpen) {
        if (!connectPromise) {
            connectPromise = client
                .connect()
                .finally(() => {
                    connectPromise = null;
                });
        }

        await connectPromise;
    }

    return client;
}
