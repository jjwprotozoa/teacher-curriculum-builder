'use client';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { JumpToWeek } from '@/components/ui/JumpToWeek';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { OnboardingChecklist } from '@/components/ui/OnboardingChecklist';
import { QuickStartCard } from '@/components/ui/QuickStartCard';
import { ResourceLink } from '@/components/ui/ResourceLink';
import {
    BookOpen,
    Calendar,
    FileText,
    Link as LinkIcon,
    Plus,
    Target
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [checklistItems, setChecklistItems] = useState([
    {
      id: 'seed-year',
      label: 'Seed 2026 year',
      description: 'Set up the academic year structure',
      href: '/curriculum',
      completed: false
    },
    {
      id: 'set-themes',
      label: 'Set themes (auto)',
      description: 'Configure weekly themes and learning objectives',
      href: '/curriculum',
      completed: false
    },
    {
      id: 'add-goals',
      label: 'Add weekly goals',
      description: 'Define learning goals for each subject area',
      href: '/weeks/1',
      completed: false
    },
    {
      id: 'review-plans',
      label: 'Review daily plans',
      description: 'Check and refine daily lesson plans',
      href: '/daily/1',
      completed: false
    },
    {
      id: 'export-csv',
      label: 'Export CSV',
      description: 'Download your curriculum data',
      href: '/api/export',
      completed: false
    }
  ]);

  const handleItemToggle = (id: string, completed: boolean) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed } : item
      )
    );
  };

  // Mock data - in real app this would come from APIs
  const recentCurriculumYears = [
    { id: '1', name: 'Foundation Phase 2026', lastModified: '2024-01-15' },
    { id: '2', name: 'Intermediate Phase 2026', lastModified: '2024-01-10' },
    { id: '3', name: 'Senior Phase 2026', lastModified: '2024-01-05' }
  ];

  const terms = [
    { id: '1', name: 'Term 1', startDate: '2026-01-20', endDate: '2026-04-01', weekCount: 11 },
    { id: '2', name: 'Term 2', startDate: '2026-04-15', endDate: '2026-06-24', weekCount: 11 },
    { id: '3', name: 'Term 3', startDate: '2026-07-15', endDate: '2026-09-25', weekCount: 11 },
    { id: '4', name: 'Term 4', startDate: '2026-10-07', endDate: '2026-12-13', weekCount: 10 }
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <MotionWrapper>
          <section className="text-center mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Curriculum Builder
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Plan your year. Focus your week. Teach your day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/curriculum-years"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Create Curriculum Year
                </Link>
                <Link
                  href="/curriculum"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Open Curriculum
                </Link>
              </div>
            </div>
          </section>
        </MotionWrapper>

        {/* Quick Start Cards */}
        <MotionWrapper delay={0.1}>
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Start</h2>
              <p className="text-slate-600">Get started with curriculum planning in three simple steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickStartCard
                title="Create Curriculum Year"
                description="Set up your academic year with terms, weeks, and learning themes"
                icon={Plus}
                href="/curriculum-years"
                cta="Create Year"
              />
              <QuickStartCard
                title="View Hybrid Stretch Framework"
                description="Explore the Montessori + NEL integration framework and all curriculum years"
                icon={Target}
                href="/curriculum"
                cta="View Framework"
              />
              <QuickStartCard
                title="View Term 1 Example"
                description="See a complete implementation of the Hybrid Stretch Framework"
                icon={Calendar}
                href="/curriculum/term1"
                cta="View Example"
              />
              <QuickStartCard
                title="Fill Weekly & Daily Plans"
                description="Plan learning objectives and daily activities for each subject"
                icon={FileText}
                href="/weeks/1"
                cta="Start Planning"
              />
            </div>
          </section>
        </MotionWrapper>

        {/* Jump to Week */}
        <MotionWrapper delay={0.2}>
          <section className="mb-16">
            <JumpToWeek />
          </section>
        </MotionWrapper>

        {/* Recent Curriculum Years */}
        <MotionWrapper delay={0.3}>
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Recent Curriculum Years</h2>
              <p className="text-slate-600">Continue where you left off</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentCurriculumYears.map((curriculumYear) => (
                <Card key={curriculumYear.id} className="p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{curriculumYear.name}</h3>
                      <p className="text-sm text-slate-600 mb-3">
                        Last modified: {new Date(curriculumYear.lastModified).toLocaleDateString()}
                      </p>
                      <Link 
                        href={`/curriculum-years/${curriculumYear.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Open →
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </MotionWrapper>

        {/* Term Overview */}
        <MotionWrapper delay={0.4}>
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Term Overview</h2>
              <p className="text-slate-600">Your academic year structure</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {terms.map((term) => (
                <Card key={term.id} className="p-6 hover:shadow-md transition-all duration-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{term.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge variant="default">{term.weekCount} weeks</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {new Date(term.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(term.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <Link 
                      href={`/curriculum/term/${term.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      View weeks & themes
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </MotionWrapper>

        {/* Onboarding Checklist */}
        <MotionWrapper delay={0.5}>
          <section className="mb-16">
            <OnboardingChecklist 
              items={checklistItems}
              onItemToggle={handleItemToggle}
            />
          </section>
        </MotionWrapper>

        {/* Resources */}
        <MotionWrapper delay={0.6}>
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Resources</h2>
              <p className="text-slate-600">Templates and guides to help you get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceLink
                title="Weekly Template"
                description="Standard template for weekly lesson planning"
                href="/templates/weekly"
                icon={<FileText className="w-4 h-4 text-indigo-600" />}
              />
              <ResourceLink
                title="Daily Template"
                description="Template for daily lesson plans and activities"
                href="/templates/daily"
                icon={<FileText className="w-4 h-4 text-indigo-600" />}
              />
              <ResourceLink
                title="Linking Guide"
                description="How to connect themes across subjects and weeks"
                href="/guides/linking"
                icon={<LinkIcon className="w-4 h-4 text-indigo-600" />}
              />
            </div>
          </section>
        </MotionWrapper>
      </div>
    </>
  );
}
