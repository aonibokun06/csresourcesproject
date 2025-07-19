"use client";

import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import Header from "@/components/Header";
import Link from "next/link";
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  ServerIcon,
  CloudIcon,
  ShieldCheckIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";

const topicIcons: Record<string, any> = {
  "web-development": CodeBracketIcon,
  "dsa": CpuChipIcon,
  "ai-ml": RocketLaunchIcon,
  "cs-fundamentals": BookOpenIcon,
  "databases": ServerIcon,
  "cloud-computing": CloudIcon,
  "cybersecurity": ShieldCheckIcon,
  "systems-programming": CommandLineIcon,
  // EXAMPLE: Add new topic icon mapping
  // "mobile-development": DevicePhoneMobileIcon,
};

const topicColors: Record<string, string> = {
  "web-development": "bg-blue-500",
  "dsa": "bg-green-500",
  "ai-ml": "bg-purple-500",
  "cs-fundamentals": "bg-orange-500",
  "databases": "bg-red-500",
  "cloud-computing": "bg-indigo-500",
  "cybersecurity": "bg-yellow-500",
  "systems-programming": "bg-gray-500",
  // EXAMPLE: Add new topic color
  // "mobile-development": "bg-pink-500",
};

export default function TopicsPage() {
  const topics = useQuery(api.notes.getTopics);

  const defaultTopics = [
    {
      _id: "web-development",
      name: "Web Development",
      description: "Learn HTML, CSS, JavaScript, React, and modern web technologies. Build responsive websites and web applications.",
      slug: "web-development",
      featured: true,
      order: 1,
    },
    {
      _id: "dsa",
      name: "Data Structures & Algorithms",
      description: "Master fundamental algorithms and data structures. Essential for technical interviews and software engineering.",
      slug: "dsa",
      featured: true,
      order: 2,
    },
    {
      _id: "ai-ml",
      name: "Machine Learning & AI",
      description: "Explore artificial intelligence and machine learning concepts. From basic algorithms to deep learning frameworks.",
      slug: "ai-ml",
      featured: true,
      order: 3,
    },
    {
      _id: "cs-fundamentals",
      name: "Computer Science Fundamentals",
      description: "Core CS concepts, theory, and principles. Understanding the foundations of computing.",
      slug: "cs-fundamentals",
      featured: true,
      order: 4,
    },
    {
      _id: "databases",
      name: "Databases & Data Management",
      description: "Learn about SQL, NoSQL databases, data modeling, and database design principles.",
      slug: "databases",
      featured: false,
      order: 5,
    },
    {
      _id: "cloud-computing",
      name: "Cloud Computing",
      description: "AWS, Azure, Google Cloud, and cloud-native development practices.",
      slug: "cloud-computing",
      featured: false,
      order: 6,
    },
    {
      _id: "cybersecurity",
      name: "Cybersecurity",
      description: "Network security, cryptography, ethical hacking, and security best practices.",
      slug: "cybersecurity",
      featured: false,
      order: 7,
    },
    {
      _id: "systems-programming",
      name: "Systems Programming",
      description: "Operating systems, low-level programming, and system architecture.",
      slug: "systems-programming",
      featured: false,
      order: 8,
    },
  ];

  const displayTopics = topics || defaultTopics;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse Topics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore curated computer science resources organized by topic. Each topic contains hand-picked 
            learning materials, tutorials, and references to help you master different areas of computer science.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayTopics.map((topic) => {
            const Icon = topicIcons[topic.slug] || BookOpenIcon;
            const color = topicColors[topic.slug] || "bg-gray-500";
            
            return (
              <Link
                key={topic._id}
                href={`/topics/${topic.slug}`}
                className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300"
              >
                <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium text-sm group-hover:text-blue-800 transition-colors">
                    Explore Topic
                  </span>
                  {topic.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              More Topics Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new topics and resources to our collection. 
              Check back regularly for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 