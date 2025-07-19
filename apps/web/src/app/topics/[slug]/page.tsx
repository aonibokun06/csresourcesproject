"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  ServerIcon,
  CloudIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon
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
};

const typeIcons: Record<string, any> = {
  "video": PlayCircleIcon,
  "article": DocumentTextIcon,
  "course": AcademicCapIcon,
  "book": BookOpenIcon,
  "tool": WrenchScrewdriverIcon,
  "practice": PuzzlePieceIcon,
};

const defaultTopics = {
  "web-development": {
    name: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and modern web technologies. Build responsive websites and web applications.",
    icon: CodeBracketIcon,
    color: "bg-blue-500",
  },
  "dsa": {
    name: "Data Structures & Algorithms",
    description: "Master fundamental algorithms and data structures. Essential for technical interviews and software engineering.",
    icon: CpuChipIcon,
    color: "bg-green-500",
  },
  "ai-ml": {
    name: "Machine Learning & AI",
    description: "Explore artificial intelligence and machine learning concepts. From basic algorithms to deep learning frameworks.",
    icon: RocketLaunchIcon,
    color: "bg-purple-500",
  },
  "cs-fundamentals": {
    name: "Computer Science Fundamentals",
    description: "Core CS concepts, theory, and principles. Understanding the foundations of computing.",
    icon: BookOpenIcon,
    color: "bg-orange-500",
  },
  "databases": {
    name: "Databases & Data Management",
    description: "Learn about SQL, NoSQL databases, data modeling, and database design principles.",
    icon: ServerIcon,
    color: "bg-red-500",
  },
  "cloud-computing": {
    name: "Cloud Computing",
    description: "AWS, Azure, Google Cloud, and cloud-native development practices.",
    icon: CloudIcon,
    color: "bg-indigo-500",
  },
  "cybersecurity": {
    name: "Cybersecurity",
    description: "Network security, cryptography, ethical hacking, and security best practices.",
    icon: ShieldCheckIcon,
    color: "bg-yellow-500",
  },
  "systems-programming": {
    name: "Systems Programming",
    description: "Operating systems, low-level programming, and system architecture.",
    icon: CommandLineIcon,
    color: "bg-gray-500",
  },
};

// Resource Card Component
function ResourceCard({ 
  resource, 
  TypeIcon, 
  onSave, 
  onComplete 
}: { 
  resource: any; 
  TypeIcon: any; 
  onSave: (resourceId: any) => void; 
  onComplete: (resourceId: any) => void; 
}) {
  const isSaved = useQuery(api.notes.isResourceSaved, { resourceId: resource._id });
  const isCompleted = useQuery(api.notes.isResourceCompleted, { resourceId: resource._id });

  const handleSave = () => {
    onSave({ resourceId: resource._id });
  };

  const handleComplete = () => {
    onComplete({ resourceId: resource._id });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <TypeIcon className="w-4 h-4 text-gray-500" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            resource.type === 'video' ? 'bg-red-100 text-red-800' :
            resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
            resource.type === 'course' ? 'bg-green-100 text-green-800' :
            resource.type === 'book' ? 'bg-purple-100 text-purple-800' :
            resource.type === 'tool' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {resource.type}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleSave}
            className={`p-1.5 rounded transition-colors ${
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
            className={`p-1.5 rounded transition-colors ${
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
      
      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 flex-grow">
        {resource.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
        {resource.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            resource.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {resource.difficulty}
          </span>
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex gap-1">
              {resource.tags.slice(0, 2).map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-1"
        >
          View Resource
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function TopicDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const topic = useQuery(api.notes.getTopicBySlug, { slug });
  const resources = useQuery(
    api.notes.getResourcesByTopic, 
    topic?._id ? { topicId: topic._id } : "skip"
  );

  // Mutations for bookmark and completion
  const saveResource = useMutation(api.notes.saveResource);
  const markCompleted = useMutation(api.notes.markResourceCompleted);

  const topicInfo = topic || defaultTopics[slug as keyof typeof defaultTopics];
  
  if (!topicInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Topic not found</h1>
          <Link href="/topics" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  // Handle icon properly - if it's a string (from DB), get the component, otherwise use directly
  const Icon = typeof topicInfo.icon === 'string' 
    ? topicIcons[slug] || BookOpenIcon 
    : topicInfo.icon;
  const color = topicInfo.color;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Topic Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{topicInfo.name}</h1>
              <p className="text-gray-600 mt-2">{topicInfo.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/topics"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Back to Topics
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resources Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
              
              {resources && resources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {resources.map((resource) => {
                    const TypeIcon = typeIcons[resource.type] || DocumentTextIcon;
                    
                    return (
                      <ResourceCard 
                        key={resource._id} 
                        resource={resource} 
                        TypeIcon={TypeIcon}
                        onSave={saveResource}
                        onComplete={markCompleted}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources yet</h3>
                  <p className="text-gray-600 mb-4">
                    Resources for this topic will be added soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Topics Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Topics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(defaultTopics)
                .filter(([key]) => key !== slug)
                .slice(0, 6)
                .map(([key, topic]) => {
                  const TopicIcon = topic.icon;
                  return (
                    <Link
                      key={key}
                      href={`/topics/${key}`}
                      className="group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-blue-300"
                    >
                      <div className={`w-12 h-12 ${topic.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <TopicIcon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {topic.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {topic.description}
                      </p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 