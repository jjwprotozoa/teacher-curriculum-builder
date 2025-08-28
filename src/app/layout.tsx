import { AppHeader } from '@/components/layout/AppHeader';
import './globals.css';

export const metadata = { 
  title: "Curriculum Builder", 
  description: "Plan your year. Focus your week. Teach your day." 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <AppHeader breadcrumbs={[]} showBreadcrumbs={false} />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
