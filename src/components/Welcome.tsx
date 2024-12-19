import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import useStore from '../store/useStore';

export default function Welcome() {
  const navigate = useNavigate();
  const startAssessment = useStore(state => state.startAssessment);

  const handleStart = () => {
    startAssessment();
    navigate('/assessment/begin-digital-collection');
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to the BDTA Tool Kit
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive digital assessment tool for school safety professionals.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 max-w-xl mx-auto text-left">
          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full">
              <svg 
                className="w-5 h-5 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Step-by-Step Guidance</h3>
              <p className="text-muted-foreground">
                Clear, intuitive process with real-time feedback and validation
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full">
              <svg 
                className="w-5 h-5 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Data Collection Manager</h3>
              <p className="text-muted-foreground">
                Organize and manage screenshots, notes, and social media references
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-primary/10 p-2 rounded-full">
              <svg 
                className="w-5 h-5 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">PDF Generation</h3>
              <p className="text-muted-foreground">
                Generate comprehensive reports with all collected information
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleStart}
          size="lg"
          className="text-lg px-8"
        >
          Start New Assessment
        </Button>
      </div>
    </div>
  );
}
