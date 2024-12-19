import { Button } from './ui/button';
import { jsPDF } from 'jspdf';
import { renderText, renderImage, formatDate, toString, joinArray, formatText } from '../lib/pdf-helpers';

export default function PDFTest() {
  const handleGeneratePDF = () => {
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
        text: 'PDF Generation Test',
        x: pageWidth / 2,
        y: yPos,
        align: 'center'
      });
      yPos += lineHeight * 2;

      // Test basic text rendering
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '1. Basic Text Rendering',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      renderText({
        doc,
        text: 'This is a test of basic text rendering with automatic line wrapping for long paragraphs that need to be split across multiple lines.',
        x: margin,
        y: yPos,
        maxWidth: contentWidth
      });
      yPos += lineHeight * 3;

      // Test text alignment
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '2. Text Alignment',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      renderText({
        doc,
        text: 'Left aligned text',
        x: margin,
        y: yPos,
        align: 'left'
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: 'Center aligned text',
        x: pageWidth / 2,
        y: yPos,
        align: 'center'
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: 'Right aligned text',
        x: pageWidth - margin,
        y: yPos,
        align: 'right'
      });
      yPos += lineHeight * 2;

      // Test different data types
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '3. Different Data Types',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      renderText({
        doc,
        text: `Number: ${toString(42)}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: `Boolean: ${toString(true)}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: `Date: ${formatDate(new Date())}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: `Array: ${joinArray(['apple', 'banana', 'orange'])}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight * 2;

      // Test null/undefined handling
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '4. Null/Undefined Handling',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      renderText({
        doc,
        text: `Null: ${toString(null, '(null)')}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: `Undefined: ${toString(undefined, '(undefined)')}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight * 2;

      // Test text formatting
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '5. Text Formatting',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      renderText({
        doc,
        text: formatText('  trimmed text  ', '', { trim: true }),
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      renderText({
        doc,
        text: formatText('uppercase text', '', { uppercase: true }),
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      // Test array handling
      doc.setFont(undefined, 'bold');
      renderText({
        doc,
        text: '6. Array Handling',
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      doc.setFont(undefined, 'normal');
      const mixedArray = [1, 'text', true, new Date(), null, undefined];
      renderText({
        doc,
        text: `Mixed Array: ${joinArray(mixedArray)}`,
        x: margin,
        y: yPos
      });
      yPos += lineHeight;

      // Save the PDF
      doc.save('pdf-test.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Check console for details.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Generation Test</h1>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This test page generates a PDF that demonstrates various features of the PDF generation system:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Basic text rendering with line wrapping</li>
          <li>Text alignment (left, center, right)</li>
          <li>Different data type handling</li>
          <li>Null/undefined value handling</li>
          <li>Text formatting options</li>
          <li>Array handling with mixed types</li>
        </ul>
        <Button onClick={handleGeneratePDF}>
          Generate Test PDF
        </Button>
      </div>
    </div>
  );
}
