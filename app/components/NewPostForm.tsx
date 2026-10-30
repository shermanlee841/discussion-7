"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import createNewPost from "../../lib/createNewPost";

type Post = {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
};

type NewPostFormProps = {
    addPost: (post: Post) => void;
};

export default function NewPostForm({ addPost }: NewPostFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const newPost = await createNewPost(title, content);

        addPost(newPost);

        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                margin="normal"
            />

            <Textarea
                placeholder="Write your post..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
                minRows={4}
            />

            <FormHelperText>
                Enter a title and content for your post.
            </FormHelperText>

            <Button
                type="submit"
                variant="contained"
            >
                Create Post
            </Button>
        </form>
    );
}