import getAllPosts from "../../lib/getAllPosts";
import PostsDisplay from "../components/PostsDisplay";

export default async function Home() {
    const posts = await getAllPosts();

    return (
        <PostsDisplay posts={posts} />
    );
}