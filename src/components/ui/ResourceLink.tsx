import { ExternalLink } from 'lucide-react';

interface ResourceLinkProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export function ResourceLink({ title, description, href, icon }: ResourceLinkProps) {
  return (
    <a
      href={href}
      className="group block p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
              {title}
            </h4>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </a>
  );
}
