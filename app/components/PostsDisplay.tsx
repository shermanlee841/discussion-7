"use client";

import { useState } from "react";
import NewPostForm from "./NewPostForm";

type Post = {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
};

type PostsDisplayProps = {
    posts: Post[];
};

export default function PostsDisplay({ posts }: PostsDisplayProps) {
    const [postsState, setPostsState] = useState(posts);

    const addPost = (post: Post) => {
        setPostsState((currentPosts) => [...currentPosts, post]);
    };

    return (
        <div>
            {postsState.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>
                        Upvotes: {post.upvotes} | Downvotes: {post.downvotes}
                    </p>
                </div>
            ))}

            <NewPostForm addPost={addPost} />
        </div>
    );
}