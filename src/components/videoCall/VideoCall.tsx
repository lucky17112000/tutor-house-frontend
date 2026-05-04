"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const VideoCall = () => {
  const roomId = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <div>
      <input type="text" placeholder="join meeting id" ref={roomId} />
      <button
        type="submit"
        className="bg-blue-500"
        onClick={() => router.push(`/room/${roomId.current?.value}`)}
      >
        Join meeting
      </button>
    </div>
  );
};

export default VideoCall;
