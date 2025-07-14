"use client";
import { getPosts } from "@/actions/post";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

function PostCard({ post, dbUserId }: { post: Post; dbUserId: string | null }) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev(hasLiked ? -1 : 1));
    } catch (error) {
    } finally {
    }
  };

  return <div>PostCard</div>;
}

export default PostCard;
