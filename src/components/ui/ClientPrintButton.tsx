'use client';

import { PrintButton } from './PrintButton';

interface ClientPrintButtonProps {
  estimatedPages: number;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function ClientPrintButton({ 
  estimatedPages, 
  variant = 'outline',
  size = 'md',
  children 
}: ClientPrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PrintButton
      onPrint={handlePrint}
      estimatedPages={estimatedPages}
      variant={variant}
      size={size}
    >
      {children}
    </PrintButton>
  );
}
