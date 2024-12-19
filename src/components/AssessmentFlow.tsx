import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../store/useStore';
import { Button } from './ui/button';
import Question from './Question';
import { allPages } from '../data/questions';
import Breadcrumb from './Breadcrumb';

export default function AssessmentFlow() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const assessment = useStore(state => state.assessment);
  const updateAnswer = useStore(state => state.updateAnswer);
  const updateCurrentPage = useStore(state => state.updateCurrentPage);

  const currentPage = allPages.find(page => page.id === pageId);

  useEffect(() => {
    if (currentPage) {
      updateCurrentPage(currentPage.id);
    }
  }, [currentPage, updateCurrentPage]);

  if (!currentPage) {
    return <div>Page not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    // Check if we need to navigate to a specific route based on answers
    const answers = assessment?.answers || {};
    
    // Find the first question with a value
    const answeredQuestion = currentPage.questions.find(q => answers[q.id]);
    const currentAnswer = answeredQuestion ? answers[answeredQuestion.id] : undefined;

    // Find matching alternate route
    const alternateRoute = currentPage.navigation.alternateRoutes.find(route => {
      if (route.condition === 'continue') return true;
      if (currentAnswer === route.condition) return true;
      return false;
    });

    if (alternateRoute) {
      navigate(`/assessment/${alternateRoute.targetPageId}`);
    }
  };

  const handleReturn = () => {
    const alternateRoute = currentPage.navigation.alternateRoutes.find(route => route.condition === 'return');
    if (alternateRoute) {
      navigate(`/assessment/${alternateRoute.targetPageId}`);
    }
  };

  const handleReturnToPlatform = () => {
    const alternateRoute = currentPage.navigation.alternateRoutes.find(route => route.condition === 'platform');
    if (alternateRoute) {
      navigate(`/assessment/${alternateRoute.targetPageId}`);
    }
  };

  const handleQuestionChange = (questionId: string, value: any) => {
    updateAnswer(questionId, value);

    // If this is a card selection, check for navigation
    const question = currentPage.questions.find(q => q.id === questionId);
    if (question?.type === 'card-selection') {
      const route = currentPage.navigation.alternateRoutes.find(r => r.condition === value);
      if (route) {
        navigate(`/assessment/${route.targetPageId}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Breadcrumb currentPageId={currentPage.id} />
        <h1 className="text-2xl font-bold">{currentPage.title}</h1>
        <div className="h-1 bg-primary/10 rounded" />
      </div>

      <div className="space-y-8">
        {currentPage.questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            value={assessment?.answers[question.id]}
            onChange={(value) => handleQuestionChange(question.id, value)}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        {currentPage.navigation.back && (
          <Button
            variant="outline"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <div className="flex-1" />
        {currentPage.navigation.next && (
          <Button
            onClick={handleContinue}
          >
            Continue
          </Button>
        )}
        {!currentPage.navigation.next && currentPage.navigation.alternateRoutes.length > 0 && (
          <div className="flex gap-4">
            {currentPage.navigation.alternateRoutes.find(r => r.condition === 'return') && (
              <Button
                variant="outline"
                onClick={handleReturn}
              >
                Return to Analysis
              </Button>
            )}
            {currentPage.navigation.alternateRoutes.find(r => r.condition === 'platform') && (
              <Button
                onClick={handleReturnToPlatform}
              >
                Return to Platform Selection
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
