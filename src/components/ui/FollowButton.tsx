"use client";

import { useState } from "react";
import { Button } from "./button";
import { LoaderIcon } from "react-hot-toast";

function FollowButton({ userId }: { userId: number }) {
  const [isLoading, setIsLoading] = useState();

  const handleFollow = async () => {};
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
