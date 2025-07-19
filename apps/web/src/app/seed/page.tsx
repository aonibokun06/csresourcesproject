"use client";

import { useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { useState } from "react";

export default function SeedPage() {
  const seedData = useMutation(api.seed.seedData);
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const response = await seedData({});
      setResult(response.message);
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Seed Database</h1>
        <p className="text-gray-600 mb-6">
          This will add sample topics and resources to test the application.
        </p>
        
        <button
          onClick={handleSeed}
          disabled={isSeeding}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSeeding ? "Seeding..." : "Seed Database"}
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700">{result}</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 