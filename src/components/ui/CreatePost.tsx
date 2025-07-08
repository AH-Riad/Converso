"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Ghost, ImageIcon } from "lucide-react";

function CreatePost() {
  const { user } = useUser(); //client component cant be async that why we are using useUSer()
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  return (
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
          {/* TODO: HANDLE IMAGE UPLOADS */}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={"ghost"}
                size="sm"
                className="text-muted-foreground  hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center0"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
