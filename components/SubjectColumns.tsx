import React from 'react';
import { Subject } from '../types';
import { Atom, Calculator, BrainCircuit, ArrowRight } from 'lucide-react';

interface SubjectColumnsProps {
  onSelect: (subject: Subject) => void;
}

const SubjectColumns: React.FC<SubjectColumnsProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 h-full flex flex-col md:flex-row p-4 md:p-8 gap-6 animate-fade-in">
      <SubjectCard 
        subject={Subject.SCIENCE} 
        icon={<Atom size={64} />} 
        description="Explore the universe, biology, and the laws of physics."
        color="from-cyan-500 to-blue-600"
        onClick={() => onSelect(Subject.SCIENCE)}
      />
      <SubjectCard 
        subject={Subject.MATHS} 
        icon={<Calculator size={64} />} 
        description="Master algebra, geometry, calculus and statistics."
        color="from-scholar-500 to-purple-600"
        onClick={() => onSelect(Subject.MATHS)}
        isCenter
      />
      <SubjectCard 
        subject={Subject.FOUNDATION} 
        icon={<BrainCircuit size={64} />} 
        description="Build strong logic, reasoning, and critical thinking skills."
        color="from-pink-500 to-rose-600"
        onClick={() => onSelect(Subject.FOUNDATION)}
      />
    </div>
  );
};

const SubjectCard: React.FC<{ 
  subject: Subject; 
  icon: React.ReactNode; 
  description: string;
  color: string;
  onClick: () => void;
  isCenter?: boolean;
}> = ({ subject, icon, description, color, onClick, isCenter }) => {
  return (
    <div 
      className={`relative group flex-1 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:flex-[1.5] shadow-2xl ${isCenter ? 'md:-mt-4 md:mb-4 md:scale-105 hover:scale-110 z-10' : 'hover:scale-105'}`}
      onClick={onClick}
    >
      {/* Background Image/Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`}></div>
      
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="mb-auto pt-10 transform transition-transform duration-500 group-hover:translate-y-4 group-hover:scale-110 origin-top-left">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl w-fit mb-6 shadow-inner">
            {icon}
          </div>
        </div>
        
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{subject}</h2>
        <p className="text-white/80 font-medium text-lg mb-8 max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {description}
        </p>

        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
          <span>Start Learning</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default SubjectColumns;