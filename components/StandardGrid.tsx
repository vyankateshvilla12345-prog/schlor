import React from 'react';
import { Standard, Subject } from '../types';
import { ChevronLeft, GraduationCap } from 'lucide-react';

interface StandardGridProps {
  subject: Subject;
  onSelect: (std: Standard) => void;
  onBack: () => void;
}

const StandardGrid: React.FC<StandardGridProps> = ({ subject, onSelect, onBack }) => {
  const standards = Object.values(Standard);

  return (
    <div className="flex-1 p-8 overflow-y-auto animate-fade-in-up">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-scholar-600 transition-colors font-medium group"
      >
        <div className="p-1 rounded-full bg-white group-hover:bg-scholar-100 transition-colors">
            <ChevronLeft size={20} />
        </div>
        Back to Subjects
      </button>

      <div className="mb-12 text-center md:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-scholar-100 text-scholar-700 text-sm font-bold tracking-wide mb-4">
          {subject.toUpperCase()} ACADEMY
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Select your Class</h2>
        <p className="text-gray-500 text-lg">Choose your standard to access curated study materials and AI tools.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {standards.map((std, index) => (
          <button
            key={std}
            onClick={() => onSelect(std)}
            style={{ animationDelay: `${index * 50}ms` }}
            className="group relative bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-2xl hover:shadow-scholar-200/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center animate-fade-in-up text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-scholar-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
            
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-scholar-50 group-hover:bg-white flex items-center justify-center text-scholar-600 mb-4 shadow-sm group-hover:shadow-md transition-all">
               <span className="text-2xl font-bold">{std.replace('Std ', '')}</span>
            </div>
            
            <h3 className="relative z-10 text-xl font-bold text-gray-800 mb-2">{std}</h3>
            <p className="relative z-10 text-sm text-gray-500 group-hover:text-scholar-600 transition-colors">
              View Materials
            </p>
            
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <GraduationCap className="text-scholar-300 w-6 h-6" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StandardGrid;