'use client';
import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
      <ol className="flex flex-wrap gap-1 items-center">
        {items.map((it, i) => (
          <li key={i} className="flex items-center">
            {it.href ? (
              <Link 
                href={it.href} 
                className="hover:underline px-1 py-1 rounded hover:bg-slate-100 transition-colors"
              >
                {it.label}
              </Link>
            ) : (
              <span className="px-1 py-1">{it.label}</span>
            )}
            {i < items.length - 1 && (
              <span className="mx-1 sm:mx-2 text-slate-400">›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
