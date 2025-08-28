'use client';

import { useState, useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { DailyPrintTemplate } from './print-templates/DailyPrintTemplate';
import { WeeklyPrintTemplate } from './print-templates/WeeklyPrintTemplate';
import { TermPrintTemplate } from './print-templates/TermPrintTemplate';
import { SingleDayPrintTemplate } from './print-templates/SingleDayPrintTemplate';

interface PrintPreviewModalProps {
  type: 'daily' | 'weekly' | 'term' | 'singleday';
  data: any;
  onClose: () => void;
}

export function PrintPreviewModal({ type, data, onClose }: PrintPreviewModalProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!printRef.current) return;
    
    setIsPrinting(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      setIsPrinting(false);
      return;
    }

    // Get the HTML content
    const content = printRef.current.innerHTML;
    
    // Create the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #333;
            }
            .print-actions {
              margin-bottom: 20px;
              text-align: center;
            }
            .print-button {
              background: #3b82f6;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin: 0 10px;
              font-size: 14px;
            }
            .print-button:hover {
              background: #2563eb;
            }
            .close-button {
              background: #6b7280;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin: 0 10px;
              font-size: 14px;
            }
            .close-button:hover {
              background: #4b5563;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Curriculum Builder - Print Preview</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="print-actions no-print">
            <button class="print-button" onclick="window.print()">
              🖨️ Print
            </button>
            <button class="close-button" onclick="window.close()">
              ✕ Close
            </button>
          </div>
          
          <div class="print-content">
            ${content}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        setIsPrinting(false);
      }, 500);
    };
  };

  const handleDownload = () => {
    if (!printRef.current) return;
    
    const content = printRef.current.innerHTML;
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Curriculum Builder - ${type}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background: white;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curriculum-${type}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (type) {
      case 'daily':
        return <DailyPrintTemplate week={data} />;
      case 'weekly':
        return <WeeklyPrintTemplate week={data} />;
      case 'term':
        return <TermPrintTemplate term={data} />;
      case 'singleday':
        return <SingleDayPrintTemplate 
          day={data.day} 
          week={data.week} 
          curriculumContext={data.curriculumContext} 
        />;
      default:
        return <div>Unknown print type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Print Preview - {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="w-4 h-4" />
            {isPrinting ? 'Preparing...' : 'Print'}
          </button>
          
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
          
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div 
            ref={printRef}
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-sm text-gray-600">
          <p>Use the Print button to print this document or Download HTML to save it as a file</p>
        </div>
      </div>
    </div>
  );
}
