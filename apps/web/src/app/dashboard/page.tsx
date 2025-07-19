"use client";

import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import Header from "@/components/Header";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BookmarkIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  PlayCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const typeIcons: Record<string, any> = {
  "video": PlayCircleIcon,
  "article": DocumentTextIcon,
  "course": AcademicCapIcon,
  "book": BookOpenIcon,
  "tool": WrenchScrewdriverIcon,
  "practice": PuzzlePieceIcon,
};

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const userResources = useQuery(api.notes.getUserResources);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to Access Dashboard</h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your dashboard and saved resources.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const savedResources = userResources?.filter(ur => ur.userResource?.saved) || [];
  const completedResources = userResources?.filter(ur => ur.userResource?.completed) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.firstName || user.username}!
              </h1>
              <p className="text-gray-600">
                Track your learning progress and manage your saved resources.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <BookmarkIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Saved Resources</p>
                <p className="text-2xl font-bold text-gray-900">{savedResources.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedResources.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Saved Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Saved Resources</h2>
              <Link
                href="/topics"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
              >
                Browse More
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            
            {savedResources.length > 0 ? (
              <div className="space-y-4">
                {savedResources.slice(0, 5).map((resource) => {
                  const TypeIcon = typeIcons[resource.type || 'article'] || DocumentTextIcon;
                  
                  return (
                    <div key={resource._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-4 h-4 text-gray-500" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            (resource.type || 'article') === 'video' ? 'bg-red-100 text-red-800' :
                            (resource.type || 'article') === 'article' ? 'bg-blue-100 text-blue-800' :
                            (resource.type || 'article') === 'course' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {resource.type || 'article'}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (resource.difficulty || 'beginner') === 'beginner' ? 'bg-green-100 text-green-800' :
                          (resource.difficulty || 'beginner') === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {resource.difficulty || 'beginner'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
                        >
                          View Resource
                          <ArrowRightIcon className="w-4 h-4" />
                        </a>
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved resources yet</h3>
                <p className="text-gray-600 mb-4">
                  Start exploring topics and save resources you want to learn from.
                </p>
                <Link
                  href="/topics"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Topics
                </Link>
              </div>
            )}
          </div>

          {/* Learning Progress */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
            
            {completedResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedResources.slice(0, 6).map((resource) => {
                  const TypeIcon = typeIcons[resource.type || 'article'] || DocumentTextIcon;
                  
                  return (
                    <div key={resource._id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <TypeIcon className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Completed</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (resource.difficulty || 'beginner') === 'beginner' ? 'bg-green-100 text-green-800' :
                          (resource.difficulty || 'beginner') === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {resource.difficulty || 'beginner'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No completed resources yet</h3>
                <p className="text-gray-600 mb-4">
                  Start learning and mark resources as completed to track your progress.
                </p>
                <Link
                  href="/topics"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 