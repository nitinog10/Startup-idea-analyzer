
import React, { useState } from 'react';

interface IdeaInputFormProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length < 10) {
      setError('Please provide a more detailed description of your startup idea (at least 10 characters).');
      return;
    }
    setError('');
    onSubmit(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-slate-800 p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-semibold text-sky-400 mb-6 text-center">Describe Your Startup Idea</h2>
      <div className="mb-6">
        <label htmlFor="startupIdea" className="block text-sm font-medium text-gray-300 mb-1">
          Your Idea
        </label>
        <textarea
          id="startupIdea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A platform for connecting local artists with eco-friendly material suppliers..."
          rows={5}
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out shadow-sm placeholder-gray-500"
          disabled={isLoading}
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading || idea.trim().length < 10}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Idea'
        )}
      </button>
    </form>
  );
};

export default IdeaInputForm;
