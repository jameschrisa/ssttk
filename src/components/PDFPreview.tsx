import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import useStore from '../store/useStore';
import { jsPDF } from 'jspdf';
import { pages } from '../data/questions';
import { renderText, renderImage, formatDate, toString, joinArray } from '../lib/pdf-helpers';

export default function PDFPreview() {
  const navigate = useNavigate();
  const assessment = useStore(state => state.assessment);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!assessment) {
      navigate('/');
    }
  }, [assessment, navigate]);

  if (!assessment) return null;

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      let yPos = 20;
      const lineHeight = 10;
      const margin = 20;
      const pageWidth = doc.internal.pageSize.width;
      const contentWidth = pageWidth - (margin * 2);

      // Title
      doc.setFontSize(20);
      renderText({
        doc,
        text: 'BDTA Assessment Report',
        x: pageWidth / 2,
        y: yPos,
        align: 'center'
      });
      yPos += lineHeight * 2;

      // Assessment Info
      doc.setFontSize(12);
      renderText({
        doc,
        text: `Assessment ID: ${assessment.id}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;
      renderText({
        doc,
        text: `Started: ${formatDate(assessment.startedAt)}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;
      renderText({
        doc,
        text: `Last Updated: ${formatDate(assessment.lastUpdated)}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight * 2;

      // Answers
      doc.setFontSize(16);
      renderText({
        doc,
        text: 'Assessment Responses',
        x: margin,
        y: yPos
      });
      yPos += lineHeight * 1.5;
      doc.setFontSize(12);

      // Group answers by page
      for (const page of pages) {
        // Check if we need a new page
        if (yPos > doc.internal.pageSize.height - margin * 4) {
          doc.addPage();
          yPos = margin;
        }

        // Add page title
        doc.setFontSize(14);
        const titleLines = renderText({
          doc,
          text: page.title || 'Untitled Section',
          x: margin,
          y: yPos,
          maxWidth: contentWidth
        });
        yPos += lineHeight * (titleLines + 0.5);
        doc.setFontSize(12);

        // Process questions
        for (const question of page.questions) {
          const answer = assessment.answers[question.id];
          if (!answer) continue;

          // Check if we need a new page
          if (yPos > doc.internal.pageSize.height - margin * 3) {
            doc.addPage();
            yPos = margin;
          }

          // Question text
          doc.setFont(undefined, 'bold');
          const questionLines = renderText({
            doc,
            text: question.text || 'Untitled Question',
            x: margin,
            y: yPos,
            maxWidth: contentWidth
          });
          yPos += lineHeight * questionLines;

          // Answer
          doc.setFont(undefined, 'normal');
          if (question.type === 'file') {
            try {
              const imgData = answer as string;
              const imgWidth = 100;
              const imgHeight = 60;
              renderImage(doc, imgData, margin, yPos, imgWidth, imgHeight);
              yPos += imgHeight + lineHeight;
            } catch (error) {
              console.error('Failed to add image:', error);
              renderText({
                doc,
                text: '(Failed to load image)',
                x: margin,
                y: yPos
              });
              yPos += lineHeight;
            }
          } else if (Array.isArray(answer)) {
            for (const item of answer) {
              renderText({
                doc,
                text: `• ${toString(item)}`,
                x: margin + 5,
                y: yPos
              });
              yPos += lineHeight;
            }
          } else {
            const answerLines = renderText({
              doc,
              text: toString(answer),
              x: margin,
              y: yPos,
              maxWidth: contentWidth
            });
            yPos += lineHeight * answerLines;
          }

          yPos += lineHeight; // Space between questions
        }

        yPos += lineHeight * 1.5; // Space between sections
      }

      // Assets section
      if (assessment.assets.length > 0) {
        doc.addPage();
        yPos = margin;
        
        doc.setFontSize(16);
        renderText({
          doc,
          text: 'Collected Assets',
          x: margin,
          y: yPos
        });
        yPos += lineHeight * 1.5;
        doc.setFontSize(12);

        for (const asset of assessment.assets) {
          // Check if we need a new page
          if (yPos > doc.internal.pageSize.height - margin * 3) {
            doc.addPage();
            yPos = margin;
          }

          doc.setFont(undefined, 'bold');
          renderText({
            doc,
            text: `${asset.type.toUpperCase()} - ${formatDate(asset.timestamp)}`,
            x: margin,
            y: yPos,
            maxWidth: contentWidth
          });
          yPos += lineHeight;

          doc.setFont(undefined, 'normal');
          if (asset.type === 'screenshot') {
            try {
              const imgWidth = 100;
              const imgHeight = 60;
              renderImage(doc, asset.content, margin, yPos, imgWidth, imgHeight);
              yPos += imgHeight + lineHeight;
            } catch (error) {
              console.error('Failed to add asset image:', error);
              renderText({
                doc,
                text: '(Failed to load image)',
                x: margin,
                y: yPos
              });
              yPos += lineHeight;
            }
          } else {
            const contentLines = renderText({
              doc,
              text: toString(asset.content),
              x: margin,
              y: yPos,
              maxWidth: contentWidth
            });
            yPos += lineHeight * contentLines;
          }

          // Add tags
          if (asset.tags.length > 0) {
            renderText({
              doc,
              text: `Tags: ${joinArray(asset.tags)}`,
              x: margin,
              y: yPos,
              maxWidth: contentWidth
            });
            yPos += lineHeight;
          }

          yPos += lineHeight * 1.5; // Space between assets
        }
      }

      // Save the PDF
      doc.save(`BDTA-Assessment-${assessment.id}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assessment Report Preview</h2>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dcm')}
          >
            Back to DCM
          </Button>
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white space-y-8">
        {/* Assessment Information */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Assessment Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Started</p>
              <p>{formatDate(assessment.startedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p>{formatDate(assessment.lastUpdated)}</p>
            </div>
          </div>
        </section>

        {/* Answers Summary */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Assessment Responses</h3>
          <div className="space-y-6">
            {pages.map(page => (
              <div key={page.id} className="space-y-4">
                <h4 className="text-lg font-medium">{page.title}</h4>
                {page.questions.map(question => {
                  const answer = assessment.answers[question.id];
                  if (!answer) return null;

                  return (
                    <div key={question.id} className="border-b pb-4">
                      <p className="font-medium">{question.text}</p>
                      {question.type === 'file' ? (
                        <img
                          src={answer}
                          alt="Uploaded file"
                          className="mt-2 max-w-md rounded-lg"
                        />
                      ) : (
                        <p className="mt-1">
                          {Array.isArray(answer) ? joinArray(answer) : toString(answer)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* Assets Summary */}
        {assessment.assets.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Collected Assets</h3>
            <div className="space-y-4">
              {assessment.assets.map(asset => (
                <div key={asset.id} className="border rounded p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium capitalize">{asset.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(asset.timestamp)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {asset.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-secondary px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {asset.type === 'screenshot' ? (
                    <img
                      src={asset.content}
                      alt="Screenshot"
                      className="mt-2 max-w-md rounded-lg"
                    />
                  ) : (
                    <p className="mt-2">{asset.content}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
