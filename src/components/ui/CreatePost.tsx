"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";

function CreatePost() {
  const { user } = useUser(); //client component cant be async that why we are using useUSer()
  const [content, setContent] = useState<string>("");
  const [imagrUrl, setImageUrl] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                className="min-h[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPosting}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePost;
