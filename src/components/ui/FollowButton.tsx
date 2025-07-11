"use client";

import { useState } from "react";
import { Button } from "./button";
import toast, { LoaderIcon } from "react-hot-toast";

function FollowButton({ userId }: { userId: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      //   await toggleFollow(userId);
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Error follwing user");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <LoaderIcon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
}

export default FollowButton;
