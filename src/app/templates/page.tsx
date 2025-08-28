import { Breadcrumbs } from '@/components/nav/Breadcrumbs';
import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Breadcrumbs items={[{ label: 'Curriculum Builder', href: '/' }, { label: 'Templates' }]} />
      <h1 className="text-2xl font-semibold mb-4">Templates</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Weekly and Daily template sections to keep plans consistent. Use these as guidance for your page layouts.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Weekly: Theme, Dates, Learning Focus (Maths, Literacy, Motor, Creative, Science, Social/Emotional), Resources</li>
        <li>Daily: Date, Focus Area, Schedule blocks, Materials, Reflection</li>
      </ul>
      <div className="mt-6 space-y-3">
        <div>
          <Link href="/curriculum" className="underline text-sm">Go to Curriculum</Link>
        </div>
        <div>
          <Link href="/templates/curriculum-builder" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
            View Curriculum Builder Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
