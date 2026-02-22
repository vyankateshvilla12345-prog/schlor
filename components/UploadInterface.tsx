import React, { useState, useRef } from 'react';
import { Subject, Standard, UploadedFile } from '../types';
import { UploadCloud, FileText, X, ChevronLeft, CheckCircle2, Sparkles, FileImage } from 'lucide-react';
import GeminiChat, { GeminiChatRef } from './GeminiChat';
import { generateStudyHelp } from '../services/gemini';

interface UploadInterfaceProps {
  subject: Subject;
  standard: Standard;
  onBack: () => void;
}

interface ExtendedUploadedFile extends UploadedFile {
  fileObject: File;
  isGenerating?: boolean;
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ subject, standard, onBack }) => {
  const [files, setFiles] = useState<ExtendedUploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<GeminiChatRef>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploaded: ExtendedUploadedFile[] = newFiles.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: f.size,
      type: f.type,
      uploadDate: new Date(),
      fileObject: f
    }));
    setFiles(prev => [...prev, ...uploaded]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerateNotes = async (file: ExtendedUploadedFile) => {
    if (!chatRef.current) return;
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
        chatRef.current.addMessage(`I can currently only generate deep analysis notes from Image files. Please upload a JPG or PNG of your textbook page or notes.`, 'model');
        return;
    }

    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, isGenerating: true } : f));
    
    try {
        chatRef.current.addMessage(`Generating notes from ${file.name}...`, 'user');
        
        const base64Data = await convertFileToBase64(file.fileObject);
        
        const response = await generateStudyHelp(
            subject, 
            standard, 
            "Generate comprehensive notes from this image.", 
            [], // No history needed for single shot image analysis
            { 
                inlineData: {
                    data: base64Data,
                    mimeType: file.type
                }
            }
        );

        chatRef.current.addMessage(response, 'model');

    } catch (error) {
        console.error(error);
        chatRef.current.addMessage("Failed to generate notes. Please try again.", 'model');
    } finally {
        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, isGenerating: false } : f));
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{subject}</h2>
            <p className="text-scholar-600 font-medium">{standard}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Column: Upload Area & File List */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* Upload Zone */}
          <div 
            className={`border-3 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-white
              ${isDragging ? 'border-scholar-500 bg-scholar-50' : 'border-gray-200 hover:border-scholar-300 hover:bg-gray-50'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileChange} 
            />
            <div className="w-16 h-16 bg-scholar-100 text-scholar-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Click to Upload Materials</h3>
            <p className="text-gray-500 text-sm mb-4">or drag and drop PDF, DOCX, or Images</p>
            <button className="px-6 py-2 bg-scholar-600 text-white rounded-lg font-semibold text-sm hover:bg-scholar-700 transition-colors shadow-lg shadow-scholar-200">
              Select Files
            </button>
          </div>

          {/* File List */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 px-1">Uploaded Resources ({files.length})</h3>
            {files.length === 0 && (
              <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-400 text-sm">No files uploaded yet. Add materials to get AI assistance.</p>
              </div>
            )}
            {files.map(file => (
              <div key={file.id} className="flex flex-col p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    {file.type.startsWith('image/') ? <FileImage size={20} /> : <FileText size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB • Just now</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                        className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    >
                        <X size={18} />
                    </button>
                    </div>
                </div>

                {/* Generate Notes Action */}
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                    <button 
                        onClick={() => handleGenerateNotes(file)}
                        disabled={file.isGenerating}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                            ${file.isGenerating 
                                ? 'bg-gray-100 text-gray-400 cursor-wait' 
                                : 'bg-scholar-50 text-scholar-700 hover:bg-scholar-100 hover:scale-105'}
                        `}
                    >
                        {file.isGenerating ? (
                            <>
                                <Sparkles size={12} className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={12} />
                                Generate Notes
                            </>
                        )}
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Chat */}
        <div className="w-full lg:w-[400px] xl:w-[450px] h-[600px] lg:h-auto">
           <GeminiChat ref={chatRef} subject={subject} standard={standard} />
        </div>
      </div>
    </div>
  );
};

export default UploadInterface;