"use server";

import getCollection, { POSTS_COLLECTION } from "../db";

type PostProps = {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
};

export default async function createNewPost(
    title: string,
    content: string
): Promise<PostProps> {
    console.log("creating new post");

    const p = {
        title: title,
        content: content,
        upvotes: 0,
        downvotes: 0,
    };

    // insert in DB
    const postsCollection = await getCollection(POSTS_COLLECTION);
    const res = await postsCollection.insertOne({ ...p });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return {
        ...p,
        id: res.insertedId.toHexString()
    };
}