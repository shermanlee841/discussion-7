import getCollection, { POSTS_COLLECTION } from "../db";
import { getRedisClient } from "@/redis";

type PostProps = {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
};

const CACHE_KEY = "all_posts";

export default async function getAllPosts(): Promise<PostProps[]> {
    const redis = await getRedisClient();
    const cached = await redis.get(CACHE_KEY);

    if (cached) {
        console.log("Cache Hit");
        return JSON.parse(cached);
    }

    console.log("Cache Miss");

    const postsCollection = await getCollection(POSTS_COLLECTION);
    const data = await postsCollection.find().toArray();

    const posts: PostProps[] = data.map((p) => ({
        id: p._id.toHexString(),
        title: p.title,
        content: p.content,
        upvotes: p.upvotes,
        downvotes: p.downvotes,
    }));

    const reversed = posts.reverse();

    await redis.set(CACHE_KEY, JSON.stringify(reversed), {
        EX: 60,
    });

    return posts.reverse();
}
