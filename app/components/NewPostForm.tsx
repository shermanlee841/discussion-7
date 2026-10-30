"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";

export default function NewPostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Title:", title);
        console.log("Content:", content);
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