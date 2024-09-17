"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const handleDelete = (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (!hasConfirmed) return;
    try {
      fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      }).then(() => {
        setPosts(posts.filter((p) => p._id !== post._id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user) fetchUserPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="This is my profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
