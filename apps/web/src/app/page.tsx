"use client";

import Header from "@/components/Header";
import { useQuery, useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import Link from "next/link";
import { 
  ArrowRightIcon, 
  BookOpenIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  BookmarkIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline";

const typeIcons: Record<string, any> = {
  "video": PlayCircleIcon,
  "article": DocumentTextIcon,
  "course": AcademicCapIcon,
  "book": BookOpenIcon,
  "tool": WrenchScrewdriverIcon,
  "practice": PuzzlePieceIcon,
};

// Resource Card Component for Home Page
function HomeResourceCard({ resource }: { resource: any }) {
  const saveResource = useMutation(api.notes.saveResource);
  const markCompleted = useMutation(api.notes.markResourceCompleted);
  const isSaved = useQuery(api.notes.isResourceSaved, { resourceId: resource._id });
  const isCompleted = useQuery(api.notes.isResourceCompleted, { resourceId: resource._id });
  
  const TypeIcon = typeIcons[resource.type] || DocumentTextIcon;

  const handleSave = () => {
    saveResource({ resourceId: resource._id });
  };

  const handleComplete = () => {
    markCompleted({ resourceId: resource._id });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <TypeIcon className="w-4 h-4 text-gray-500" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            resource.type === 'video' ? 'bg-red-100 text-red-800' :
            resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
            resource.type === 'course' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {resource.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            resource.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {resource.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleSave}
            className={`p-1 rounded transition-colors ${
              isSaved 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
            title={isSaved ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleComplete}
            className={`p-1 rounded transition-colors ${
              isCompleted 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircleIcon className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {resource.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {resource.description}
      </p>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
      >
        View Resource
        <ArrowRightIcon className="w-4 h-4" />
      </a>
    </div>
  );
}

export default function Home() {
  const featuredTopics = useQuery(api.notes.getFeaturedTopics);
  const featuredResources = useQuery(api.notes.getFeaturedResources);

  const topics = [
    {
      name: "Web Development",
      description: "Learn HTML, CSS, JavaScript, React, and modern web technologies",
      icon: CodeBracketIcon,
      color: "bg-blue-500",
      slug: "web-development",
    },
    {
      name: "Data Structures & Algorithms",
      description: "Master fundamental algorithms and data structures",
      icon: CpuChipIcon,
      color: "bg-green-500",
      slug: "dsa",
    },
    {
      name: "Machine Learning & AI",
      description: "Explore artificial intelligence and machine learning concepts",
      icon: RocketLaunchIcon,
      color: "bg-purple-500",
      slug: "ai-ml",
    },
    {
      name: "Computer Science Fundamentals",
      description: "Core CS concepts, theory, and principles",
      icon: BookOpenIcon,
      color: "bg-orange-500",
      slug: "cs-fundamentals",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Gateway to
              <span className="block text-yellow-300">Computer Science</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover curated computer science resources, bookmark your favorites, and explore 
              hand-picked learning materials organized by topic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/topics"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Browse Topics
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Topics</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse hand-picked resources organized by computer science topics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
              >
                <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {topic.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources && featuredResources.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Resources</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hand-picked resources to accelerate your learning journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.slice(0, 6).map((resource) => (
                <HomeResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of learners who are discovering the best computer science resources 
            through our curated directory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/topics"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Topics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
