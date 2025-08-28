'use client';
import { BookOpen, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Breadcrumbs } from '../nav/Breadcrumbs';

interface AppHeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  showBreadcrumbs?: boolean;
}

export function AppHeader({ breadcrumbs, showBreadcrumbs = true }: AppHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="hidden sm:inline">Curriculum Builder</span>
              <span className="sm:hidden">CB</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/curriculum-years" className="text-slate-600 hover:text-slate-900 transition-colors">
              Curriculum Years
            </Link>
            <Link href="/curriculum" className="text-slate-600 hover:text-slate-900 transition-colors">
              Curriculum
            </Link>
            <Link href="/weeks" className="text-slate-600 hover:text-slate-900 transition-colors">
              Weekly Plans
            </Link>
            <Link href="/daily" className="text-slate-600 hover:text-slate-900 transition-colors">
              Daily Plans
            </Link>
            <Link href="/templates" className="text-slate-600 hover:text-slate-900 transition-colors">
              Templates
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-slate-200">
            <nav className="flex flex-col gap-3 pt-3">
              <Link 
                href="/curriculum-years" 
                className="text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Curriculum Years
              </Link>
              <Link 
                href="/curriculum" 
                className="text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Curriculum
              </Link>
              <Link 
                href="/weeks" 
                className="text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Weekly Plans
              </Link>
              <Link 
                href="/daily" 
                className="text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Daily Plans
              </Link>
              <Link 
                href="/templates" 
                className="text-slate-600 hover:text-slate-900 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
            </nav>
          </div>
        )}
        
        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <div className="mt-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
      </div>
    </header>
  );
}
