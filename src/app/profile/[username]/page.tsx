"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const username = params.username as string;

  console.log("Username:", username);

  return <p>Post: {username}</p>;
}
