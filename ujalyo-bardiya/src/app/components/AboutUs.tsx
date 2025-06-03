"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ConservationSection = () => {
  const [activeTab, setActiveTab] = useState('Ecosystem');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 'Ecosystem', label: 'Ecosystem' },
    { id: 'Community', label: 'Community' },
    { id: 'Research', label: 'Research' },
    { id: 'Species', label: 'Species' }
  ];

  const tabContent = {
    Ecosystem: {
      title: "Ecosystem",
      text: "We focus on protecting natural habitats—forests, wetlands, grasslands, and waterways—recognizing that each plays a critical role in maintaining the balance of our planet's ecosystems.",
      link: "Read More",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    Community: {
      title: "Community",
      text: "Building strong partnerships with local communities is essential for sustainable conservation. We work directly with indigenous peoples.",
      link: "Learn More",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    },
    Research: {
      title: "Research", 
      text: "Our scientific research drives evidence-based conservation decisions. Through field studies, biodiversity monitoring, and ecosystem analysis, we gather critical data to understand environmental challenges and develop effective solutions.",
      link: "Explore Research",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
    },
    Species: {
      title: "Species",
      text: "Protecting individual species requires understanding their unique habitat needs and migration patterns. Our species conservation programs focus on endangered.",
      link: "View Species",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className={`space-y-2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-orange-500 animate-pulse rounded-full"></div>
              <span className="text-gray-600 font-medium tracking-wide uppercase text-sm">About Us</span>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Dedicated to protecting and restoring natural habitats.
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Creating sustainable change through community-driven initiatives that empower local populations and preserve natural ecosystems for future generations.
            </p>
            
            <button className="group bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <span className="flex items-center space-x-2">
                <span>Learn More</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Right Column */}
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 transform hover:scale-105 border ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow-md border-orange-500'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Image + Orange Content Box Wrapper */}
            <div className="relative mb-6 z-0">
              <Image
                src={tabContent[activeTab as keyof typeof tabContent].image}
                alt="Community meeting discussing conservation efforts"
                width={800}
                height={448}
                className="w-full h-[28rem] object-cover transition-transform duration-700 group-hover:scale-110 rounded"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Orange Content Box - Overlapping */}
              <div className="absolute -left-20 -bottom-32 w-[90%] bg-orange-500 text-white p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 z-10 rounded">
                <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
                  <span>{tabContent[activeTab as keyof typeof tabContent].title}</span>
                  <div className="w-2 h-2 bg-white animate-bounce"></div>
                </h2>
                <p className="text-orange-100 leading-relaxed mb-6">
                  {tabContent[activeTab as keyof typeof tabContent].text}
                </p>
                <button className="group flex items-center space-x-2 text-white font-medium hover:text-orange-200 transition-colors duration-300">
                  <span>{tabContent[activeTab as keyof typeof tabContent].link}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConservationSection;
