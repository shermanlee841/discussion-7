"use server";

export default async function createNewPost(
    title: string,
    content: string
) {
    const newPost = {
        id: crypto.randomUUID(),
        title: title,
        content: content,
        upvotes: 0,
        downvotes: 0
    };

    console.log("createNewPost called:", newPost);

    return newPost;
}