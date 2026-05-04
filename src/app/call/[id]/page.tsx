"use client";
import { randomID } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

const CallPage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "student";
  const element = useRef<HTMLDivElement>(null);

  const initZego = async () => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const userName = role === "tutor" ? "Tutor" : "Student";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(process.env.NEXT_PUBLIC_APP_ID),
      process.env.NEXT_PUBLIC_SERVER_SECRET!,
      id,
      randomID(5),
      userName,
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element.current,
      sharedLinks: [
        {
          name: "Join link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            "/call/" +
            id +
            "?role=student",
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  useEffect(() => {
    initZego();
  }, [id]);

  return (
    <div
      ref={element}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CallPage;
