"use client";

import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
    const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const promptId = null; // New promptId state

  useEffect(() => {
    const fetchPostDetails = async () => {
        setLoading(true);
        const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
      setLoading(false); // End loading once data is fetched

    };
    if (promptId) fetchPostDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    if (!promptId) return;
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id,
        }),
      });
      setSubmitting(false);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default page;
