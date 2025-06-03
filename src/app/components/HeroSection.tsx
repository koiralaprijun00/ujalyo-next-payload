"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const PAYLOAD_URL = "http://localhost:3000";

type Notice = {
  id?: string;
  category: string;
  text: string;
  image?: {
    url?: string;
    [key: string]: unknown;
  } | string;
};

const HeroSection = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${PAYLOAD_URL}/api/notices?depth=2`)
      .then(res => res.json())
      .then(data => {
        setNotices(data.docs || []);
        setLoading(false);
      });
  }, []);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setSelectedNotice(null), 300); // Wait for animation
  };

  // Sidebar animation with react-spring
  const sidebarSpring = useSpring({
    transform: sidebarOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: sidebarOpen ? 1 : 0.8,
    config: { tension: 300, friction: 30 },
  });

  // Helper to get image URL from Payload media field
  const getImageUrl = (image: Notice["image"]) => {
    if (!image) return undefined;
    if (typeof image === 'string') return image; // fallback
    if (image.url) return image.url.startsWith('http') ? image.url : `${PAYLOAD_URL}${image.url}`;
    return undefined;
  };

  return (
    <div className="mt-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Main Image */}
        <div className="md:col-span-2 relative flex flex-col justify-end">
          <div className="relative w-full h-[28rem] md:h-[32rem] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
              alt="Elephant in the wild"
              width={1200}
              height={700}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {/* Bottom Overlay with gap */}
          <div className="w-full bg-blue-900 text-white px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div className="text-2xl md:text-3xl font-bold">
              Help create harmony between humans<br />and wildlife.
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-white  hover:bg-blue-800 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-white hover:bg-blue-800 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
        {/* Right: Notices */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 animate-pulse rounded-full"></span>
            <span className="text-blue-900 font-bold text-sm">Notices</span>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-gray-500">Loading notices...</div>
            ) : (
              notices.map((notice, idx) => (
                // This is the bottom line (border) on each notice
                <div
                  key={notice.id || idx}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 group cursor-pointer"
                  onClick={() => handleNoticeClick(notice)}
                >
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 font-semibold tracking-widest mb-1">{notice.category}</div>
                    <div className="text-sm text-gray-700 leading-snug group-hover:underline">
                      {notice.text}
                    </div>
                  </div>
                  <div className="w-28 h-16 flex-shrink-0 overflow-hidden">
                    {getImageUrl(notice.image) ? (
                      <Image
                        src={getImageUrl(notice.image) as string}
                        alt={notice.category}
                        width={112}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleCloseSidebar}
      ></div>
      {/* Sidebar with react-spring animation */}
      <animated.div
        style={sidebarSpring}
        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-lg z-50"
      >
        {selectedNotice && (
          <div className="p-8 flex flex-col h-full">
            <div className="flex justify-end mb-6">
              <button
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-2xl bg-white border border-gray-300 rounded px-4 py-2 shadow-sm hover:bg-gray-100 transition"
                onClick={handleCloseSidebar}
                aria-label="Close sidebar"
              >
                <span className="text-base font-medium">Close</span>
                <span>&times;</span>
              </button>
            </div>
            <div className="mb-6">
              {getImageUrl(selectedNotice.image) ? (
                <Image
                  src={getImageUrl(selectedNotice.image) as string}
                  alt={selectedNotice.category}
                  width={400}
                  height={200}
                  className="object-cover w-full h-40 rounded mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs mb-4">No Image</div>
              )}
              <div className="text-xs text-gray-500 font-semibold tracking-widest mb-2">{selectedNotice.category}</div>
              <div className="text-lg text-gray-900 font-bold mb-2">Notice Details</div>
              <div className="text-gray-700 leading-relaxed">{selectedNotice.text}</div>
            </div>
          </div>
        )}
      </animated.div>
    </div>
  );
};

export default HeroSection;
