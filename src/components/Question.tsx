import { useState } from 'react';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ChevronDown } from 'lucide-react';
import type { Question as QuestionType } from '../types/toolkit';
import useStore from '../store/useStore';
import UsernameInput from './UsernameInput';
import GoogleSearchForm from './GoogleSearchForm';
import CardSelection from './CardSelection';

interface QuestionProps {
  question: QuestionType;
  value: any;
  onChange: (value: any) => void;
}

export default function Question({ question, value, onChange }: QuestionProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const addAsset = useStore(state => state.addAsset);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create file preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      
      // Add to assets
      addAsset({
        type: 'screenshot',
        content: base64String,
        tags: [],
        pageId: question.id,
        questionId: question.id,
      });

      // Update answer
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const renderQuestionHeader = () => (
    <div className="space-y-2">
      <div className="text-lg font-medium leading-none">
        {question.text}
      </div>
      {question.description && (
        <div 
          className="text-base text-muted-foreground mt-2"
          dangerouslySetInnerHTML={{ __html: question.description.replace(/\n/g, '<br/>') }}
        />
      )}
      {question.details && (
        <Accordion type="single" collapsible className="w-full border-none">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:text-primary hover:no-underline">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                <span>More Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pl-6">
              <div dangerouslySetInnerHTML={{ __html: question.details.replace(/\n/g, '<br/>') }} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );

  const renderContent = (content: string) => {
    // Replace markdown-style headers with HTML headers and apply styles
    const withHeaders = content
      .replace(/## ([^\n]+)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/### ([^\n]+)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/\* ([^\n]+)/g, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n(?![<])/g, ' ');
    
    return <div dangerouslySetInnerHTML={{ __html: withHeaders }} />;
  };

  switch (question.type) {
    case 'info':
      return (
        <div className="p-6 bg-secondary/10 rounded-lg border border-secondary/20">
          <div className="space-y-4">
            {question.text && (
              <div className="text-lg font-semibold">
                {question.text}
              </div>
            )}
            {question.description && (
              <div className="text-base">
                {renderContent(question.description)}
              </div>
            )}
            {question.details && (
              <div className="text-base">
                {renderContent(question.details)}
              </div>
            )}
          </div>
        </div>
      );

    case 'google-search':
      return (
        <div className="p-6 bg-secondary/10 rounded-lg border border-secondary/20">
          <div className="space-y-4">
            <div className="text-lg font-semibold">
              {question.text}
            </div>
            {question.description && (
              <div className="text-base mb-4">
                {question.description}
              </div>
            )}
            <GoogleSearchForm />
          </div>
        </div>
      );

    case 'card-selection':
      return (
        <div className={`space-y-6 ${question.id === 'analysis-type' ? 'px-6' : ''}`}>
          {question.text && (
            <div className="text-lg font-medium leading-none">
              {question.text}
            </div>
          )}
          {question.description && (
            <div className="text-base text-muted-foreground">
              {question.description}
            </div>
          )}
          <div className={question.id === 'analysis-type' ? 'max-w-[1200px] mx-auto' : ''}>
            {question.options && (
              <CardSelection
                options={question.options}
                value={value}
                onChange={onChange}
                variant={question.id === 'analysis-type' ? 'grid' : 'single'}
              />
            )}
          </div>
        </div>
      );

    case 'username-input':
      return (
        <div className="space-y-8">
          {renderQuestionHeader()}
          <UsernameInput
            value={value}
            onChange={onChange}
          />
        </div>
      );

    case 'radio':
      return (
        <div className="space-y-4">
          {renderQuestionHeader()}
          <div className="space-y-2.5">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  className="h-4 w-4"
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case 'checkbox':
      return (
        <div className="space-y-4">
          {renderQuestionHeader()}
          <div className="space-y-2.5">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={value?.includes(option.value)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(value || []), option.value]
                      : (value || []).filter((v: string) => v !== option.value);
                    onChange(newValue);
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-4">
          {renderQuestionHeader()}
          <textarea
            className="w-full h-32 p-2 border rounded"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case 'file':
      return (
        <div className="space-y-4">
          {renderQuestionHeader()}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`file-${question.id}`}
            />
            <label
              htmlFor={`file-${question.id}`}
              className="inline-block px-4 py-2 bg-primary text-white rounded cursor-pointer"
            >
              Choose File
            </label>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
