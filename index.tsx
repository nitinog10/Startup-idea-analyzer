import React, { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IdeaInputForm from './components/IdeaInputForm';
import FeedbackDisplay from './components/FeedbackDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { analyzeStartupIdea } from './services/geminiService';
import { AnalysisFeedback } from './types';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<AnalysisFeedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleIdeaSubmit = async (idea: string) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const analysisResult = await analyzeStartupIdea(idea);
      setFeedback(analysisResult);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 mb-2">
          Startup Idea Analyzer
        </h1>
        <p className="text-lg text-slate-400">
          Get AI-powered feedback on your brilliant startup concepts!
        </p>
      </header>

      <main className="w-full flex flex-col items-center">
        <ErrorAlert message={error} />
        <IdeaInputForm onSubmit={handleIdeaSubmit} isLoading={isLoading} />
        {isLoading && <LoadingSpinner />}
        {!isLoading && feedback && <FeedbackDisplay feedback={feedback} />}
      </main>
      
      <footer className="mt-auto pt-8 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
        <p>&copy; {new Date().getFullYear()} Startup Idea Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element.");
}