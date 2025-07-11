import { getRandomUser } from "@/actions/user";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUser();
  if (users.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>People you may follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between"
            >
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage
                      src={user.image ?? "/avatar.png"}
                    ></AvatarImage>
                  </Avatar>
                </Link>
                <div className="text-sm">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WhoToFollow;
