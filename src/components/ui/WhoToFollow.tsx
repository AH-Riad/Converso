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
    <Card className="shadow-md border rounded-xl">
      <CardHeader>
        <CardTitle>People you may follow</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex gap-2 items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Link href={`/profile/${user.username}`}>
                <Avatar>
                  <AvatarImage
                    src={user.image ?? "/avatar.png"}
                    alt={user.name ?? undefined}
                  />
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
      </CardContent>
    </Card>
  );
}

export default WhoToFollow;
