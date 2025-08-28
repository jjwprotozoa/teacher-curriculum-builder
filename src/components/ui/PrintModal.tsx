'use client';

import { generatePDFFromTemplate } from '@/lib/utils/pdfGenerator';
import { jsPDF } from 'jspdf';
import { useRef, useState } from 'react';
import { WeeklyPrintTemplate } from './print-templates/WeeklyPrintTemplate';

interface Week {
  id: string;
  number: number;
  title: string;
  startDate: Date;
  endDate: Date;
  term: {
    name: string;
  };
  weeklyPlan?: any;
  days: any[];
}

interface PrintModalProps {
  week: Week;
  onClose: () => void;
}

export function PrintModal({ week, onClose }: PrintModalProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePDF = async () => {
    if (!templateRef.current) {
      console.error('Template ref is null');
      alert('Template reference not found. Please try again.');
      return;
    }

    console.log('Starting PDF generation...');
    console.log('Template element:', templateRef.current);
    console.log('Week data:', week);

    setIsGeneratingPDF(true);
    try {
      await generatePDFFromTemplate(templateRef.current, week);
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print-modal">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Print & Export Weekly Plan</h2>
            <p className="text-gray-600 mt-1">
              Preview, print, or download as PDF
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 border-b border-gray-200 bg-gray-50">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            🖨️ Print Plan
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? '⏳ Generating...' : '📄 Download PDF'}
          </button>
          <button
            onClick={() => {
              // Simple test PDF generation
              const pdf = new jsPDF();
              pdf.text('Test PDF', 20, 20);
              pdf.save('test.pdf');
            }}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            🧪 Test PDF
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Template Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <WeeklyPrintTemplate week={week} ref={templateRef} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-sm text-gray-600">
          <p>
            This template shows the complete weekly plan with all activities expanded. 
            Use the buttons above to print or download as PDF.
          </p>
        </div>
      </div>
    </div>
  );
}
