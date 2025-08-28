'use client';

import { AlertTriangle, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PrintButtonProps {
  onPrint: () => void;
  estimatedPages: number;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function PrintButton({ 
  onPrint, 
  estimatedPages, 
  variant = 'primary',
  size = 'md',
  children 
}: PrintButtonProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [shouldPrint, setShouldPrint] = useState(false);

  // Handle print action after modal is dismissed
  useEffect(() => {
    if (shouldPrint && !showWarning) {
      onPrint();
      setShouldPrint(false);
    }
  }, [shouldPrint, showWarning, onPrint]);

  const handleClick = () => {
    if (estimatedPages > 10) {
      setShowWarning(true);
    } else {
      onPrint();
    }
  };

  const handleConfirmPrint = () => {
    setShowWarning(false);
    setShouldPrint(true);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 text-white hover:bg-indigo-700';
      case 'secondary':
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
      case 'outline':
        return 'border border-slate-300 text-slate-700 hover:bg-slate-50';
      default:
        return 'bg-indigo-600 text-white hover:bg-indigo-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors ${getVariantClasses()} ${getSizeClasses()}`}
      >
        <Printer className="w-4 h-4" />
        {children || 'Print'}
      </button>

      {/* Print Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Print Warning</h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              This document is estimated to be <strong>{estimatedPages} pages</strong> when printed. 
              This may use a significant amount of paper and ink.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPrint}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Print Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
