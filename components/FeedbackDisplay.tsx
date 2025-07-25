import React from 'react';
import { AnalysisFeedback } from '../types';

interface FeedbackDisplayProps {
  feedback: AnalysisFeedback | null;
}

const FeedbackCard: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-xl mb-6">
    <div className="flex items-center mb-3">
      {icon && <span className="mr-3 text-sky-400">{icon}</span>}
      <h3 className="text-xl font-semibold text-sky-400">{title}</h3>
    </div>
    <div className="text-gray-300 leading-relaxed prose prose-invert prose-sm max-w-none">
        {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  </div>
);

const FeasibilityScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = () => {
    if (score <= 3) return 'text-red-400';
    if (score <= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getScoreDescription = () => {
    if (score <= 2) return "Very Low Feasibility";
    if (score <= 4) return "Low Feasibility";
    if (score <= 6) return "Moderate Feasibility";
    if (score <= 8) return "Good Feasibility";
    return "High Feasibility";
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl text-center">
       <div className="flex items-center justify-center mb-3">
        <span className="mr-3 text-sky-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </span>
        <h3 className="text-2xl font-semibold text-sky-400">Feasibility Score</h3>
      </div>
      <p className={`text-6xl font-bold ${getScoreColor()}`}>{score}<span className="text-4xl">/10</span></p>
      <p className={`text-lg mt-2 font-medium ${getScoreColor()}`}>{getScoreDescription()}</p>
    </div>
  );
};


const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  if (!feedback) {
    return null;
  }

  // Safely parse goToMarketStrategy if it's a string that looks like bullet points
  let goToMarketStrategyContent: React.ReactNode = feedback.goToMarketStrategy;
  if (typeof feedback.goToMarketStrategy === 'string' && feedback.goToMarketStrategy.includes('- ')) {
    goToMarketStrategyContent = (
      <ul className="list-disc pl-5 space-y-1">
        {feedback.goToMarketStrategy.split('\n').map(line => line.trim().replace(/^- /, '')).filter(line => line).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }


  return (
    <div className="w-full max-w-2xl mt-10 animate-fadeIn" aria-live="polite">
      <h2 className="text-3xl font-bold text-center mb-8 text-sky-300">Startup Analysis Results</h2>
      
      <FeedbackCard title="Overall Assessment" icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      }>
        {feedback.overallAssessment}
      </FeedbackCard>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <FeedbackCard title="Uniqueness" icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75l-1.25-1.75L14.25 12l1.5-1.75L17 8.25l1.25 1.75L19.75 12l-1.5 1.75z" />
          </svg>
        }>
          {feedback.uniqueness}
        </FeedbackCard>
        <FeedbackCard title="Competition" icon={
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.14M6.29 18.72A9.09 9.09 0 0 1 2.55 18.241a3 3 0 0 1 3.741-5.14m0 0a2.25 2.25 0 0 1 4.498 0M1.5 15.682a9.094 9.094 0 0 1 1.786-3.07M22.5 15.682a9.094 9.094 0 0 0-1.786-3.07M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
          </svg>
        }>
          {feedback.competition}
        </FeedbackCard>
      </div>
       <FeedbackCard title="Go-To-Market Strategy" icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      }>
        {goToMarketStrategyContent}
      </FeedbackCard>
      
      <FeasibilityScoreDisplay score={feedback.feasibilityScore} />

    </div>
  );
};

export default FeedbackDisplay;