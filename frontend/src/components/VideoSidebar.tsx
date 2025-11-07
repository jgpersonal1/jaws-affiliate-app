// src/components/VideoSidebar.tsx
import React, { useState, useEffect } from "react";

export const VideoSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const videos = [
    "https://www.youtube.com/embed/1JzMKO7_v14?si=7Yhj_W_9Idr1sRDU",
    "https://www.youtube.com/embed/_th7MXgiYpQ?si=sPdZHQQkzIvQrswx",
    "https://www.youtube.com/embed/ZOV_sYXToNg?si=z6HN2nvfcryKXWsC",
    "https://www.youtube.com/embed/LQ1GDjVjZL8?si=cMFCQM3vy_hEL8mv",
    "https://www.youtube.com/watch?v=_th7MXgiYpQ&t=210s",
"https://www.youtube.com/watch?v=J9oMZAFSlxo",
"https://www.youtube.com/watch?v=LQ1GDjVjZL8",
"https://www.youtube.com/watch?v=A-xfBbdFMQk&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=Ia9WIRiAPSU",
"https://www.youtube.com/watch?v=JV-Lipp2y_I",
"https://www.youtube.com/watch?v=PV_mBtwhn9M",
"https://www.youtube.com/watch?v=K6FlCI_q7ZU",
"https://www.youtube.com/watch?v=1JzMKO7_v14",
"https://www.youtube.com/watch?v=ZOV_sYXToNg",
"https://www.youtube.com/watch?v=9J5R09qFtnk",
"https://www.youtube.com/watch?v=EozeX8l4dxc",
"https://www.youtube.com/watch?v=1VnOdyDcUao",
"https://www.youtube.com/watch?v=ByHZTnBr_pc",
"https://www.youtube.com/watch?v=qbLkr8WhYlU",
"https://www.youtube.com/watch?v=5rfwsuIO6iE&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=Hj3hUnEVMlU",
"https://www.youtube.com/watch?v=cs6a6lcNgdY&t=52s",
"https://www.youtube.com/watch?v=QB_41xrMdeU",
"https://www.youtube.com/watch?v=0VYRg_AHOFo",
"https://www.youtube.com/watch?v=9szg2lxB7NM",
"https://www.youtube.com/watch?v=TpDr71993Dw",
"https://www.youtube.com/watch?v=TwGHeHeKruI",
"https://www.youtube.com/watch?v=OhtWpCwzl2c&t=3s",
"https://www.youtube.com/watch?v=hwwI0E1xUls&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=jxdP16kMxo0",
"https://www.youtube.com/watch?v=Dc1HMI6W2L8",
"https://www.youtube.com/watch?v=8Ny1EVMHitI",
"https://www.youtube.com/watch?v=_e5CGQ3l9SU",
"https://www.youtube.com/watch?v=FAyWnleqLIY",
"https://www.youtube.com/watch?v=eyzVfDEcl0Y&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=U5F_mzjbAVM&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=r8NtxO0CkA4",
"https://www.youtube.com/watch?v=yna2GMN6QD8",
"https://www.youtube.com/watch?v=9LVemvvaMs8",
"https://www.youtube.com/watch?v=n3XwJippZlk",
"https://www.youtube.com/watch?v=OsIMSLr2jSk",
"https://www.youtube.com/watch?v=PSaHgx2w9WM",
"https://www.youtube.com/watch?v=Qc_GPGItBRs&pp=0gcJCQMKAYcqIYzv",
"https://www.youtube.com/watch?v=GrQ7Eny8YDc",
"https://www.youtube.com/watch?v=9b1-rGC1HiY&t=5s",
  ];

  // Detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <aside
      style={{
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "0" : "80px",
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: isMobile ? "white" : "transparent",
        borderRadius: isMobile ? 12 : 0,
        boxShadow: isMobile && isOpen ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        padding: isMobile ? "12px" : "0",
      }}
    >
      {/* Toggle button (mobile only) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: isOpen ? 8 : 0,
          }}
        >
          {isOpen ? "Hide Videos ▲" : "🎥 Show Videos ▼"}
        </button>
      )}

      {/* Sidebar header */}
      {(!isMobile || isOpen) && (
        <>
         {/*  <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              textAlign: "center",
              color: "#1e3a8a",
              marginBottom: 4,
            }}
          >
            The Shark is Still Working Videos
          </h2>
 */}
          {videos.map((url, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              <iframe
                src={url}
                title={`Jaws video ${index + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </>
      )}
    </aside>
  );
};
