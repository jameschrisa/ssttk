import { jsPDF } from 'jspdf';

type PDFValue = string | number | boolean | Date | null | undefined;
type PDFArray = PDFValue[];
type PDFText = PDFValue | PDFArray;

interface RenderTextOptions {
  doc: jsPDF;
  text: PDFText;
  x: number;
  y: number;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
}

// Simple helper to ensure we always have a string
export const toString = (value: PDFText, defaultValue: string = ''): string => {
  if (value === null || value === undefined) return defaultValue;
  if (value instanceof Date) return value.toLocaleString();
  if (Array.isArray(value)) return value.map(v => toString(v)).filter(Boolean).join(', ');
  return String(value);
};

// Core text rendering function
export const renderText = ({
  doc,
  text,
  x,
  y,
  align = 'left',
  maxWidth
}: RenderTextOptions): number => {
  const safeText = toString(text);
  if (!safeText) return 1;

  const lines = maxWidth
    ? doc.splitTextToSize(safeText, maxWidth)
    : [safeText];

  lines.forEach((line: string, index: number) => {
    doc.text(line, x, y + (index * 10), { align });
  });

  return lines.length;
};

// Helper for rendering images
export const renderImage = (
  doc: jsPDF,
  imageData: string | undefined,
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  if (!imageData) {
    doc.text('(No image data)', x, y);
    return;
  }

  try {
    doc.addImage(imageData, 'JPEG', x, y, width, height);
  } catch (error) {
    console.error('Failed to render image:', error);
    doc.text('(Failed to load image)', x, y);
  }
};

// Helper for formatting dates
export const formatDate = (date: string | Date | undefined | null): string => {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString();
  } catch {
    return '';
  }
};

// Helper for joining arrays
export const joinArray = (arr: PDFArray | undefined | null, separator = ', '): string => {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.map(item => toString(item)).filter(Boolean).join(separator);
};

// Helper for safe text splitting
export const splitText = (
  doc: jsPDF,
  text: PDFText,
  maxWidth: number,
  defaultValue: string = ''
): string[] => {
  const safeText = toString(text, defaultValue);
  return doc.splitTextToSize(safeText, maxWidth);
};

// Helper for formatting text with options
export const formatText = (
  text: PDFText,
  defaultValue: string = '',
  options?: {
    uppercase?: boolean;
    trim?: boolean;
  }
): string => {
  let result = toString(text, defaultValue);
  
  if (options?.trim) {
    result = result.trim();
  }
  
  if (options?.uppercase) {
    result = result.toUpperCase();
  }
  
  return result;
};
