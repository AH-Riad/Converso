import { getPosts } from "@/actions/post";
import CreatePost from "@/components/ui/CreatePost";
import PostCard from "@/components/ui/PostCard";
import WhoToFollow from "@/components/ui/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Page() {
  const user = await currentUser();
  const post = await getPosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Center: CreatePost */}
      <div className="lg:col-span-6">{user ? <CreatePost /> : null}</div>
      <div className="space-y-6">
        {post.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {/* Right Sidebar: WhoToFollow */}
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
