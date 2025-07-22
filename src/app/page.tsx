import { getPosts } from "@/actions/post";
import { getDbUserId } from "@/actions/user";
import CreatePost from "@/components/ui/CreatePost";
import PostCard from "@/components/ui/PostCard";
import WhoToFollow from "@/components/ui/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Page() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
      {/* Main Feed */}
      <div className="lg:col-span-8 space-y-6">
        {user ? <CreatePost /> : null}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={dbUserId} />
        ))}
      </div>

      {/* Right Sidebar - Who to Follow */}
      <div className="hidden lg:block lg:col-span-4">
        <div className="sticky top-20">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
}
