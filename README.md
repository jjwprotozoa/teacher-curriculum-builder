# Curriculum Builder

A comprehensive tool for planning and managing early childhood curriculum across terms, weeks, and daily activities.

## Features

- **Curriculum Year-based management** - Create and manage multiple curriculum years
- **Term and week planning** - Organize academic year into terms and weeks
- **Daily activity scheduling** - Plan daily activities with structured time slots
- **Learning goal tracking** - Set and track learning objectives across subjects
- **CSV export functionality** - Generate reports for administration and parents

## UI/UX Design System

### Global Design

- **Palette**: slate-50 background, slate-900 headings, slate-600 body text, indigo accent
- **Cards**: rounded-2xl, border-slate-200, shadow-sm, hover:shadow-md
- **Layout**: max-w-6xl mx-auto px-6 py-8 with sticky header
- **Motion**: Subtle section fade/slide animations with Framer Motion
- **Icons**: Lucide React icons throughout the interface

### Navigation Flow

```
Year → Term → Week → Day
```

### Components

#### Core UI Components

- `Card` - Base card component with hover effects
- `Badge` - Theme and status indicators
- `SectionHeader` - Consistent section titles
- `MotionWrapper` - Framer Motion animations

#### Feature Components

- `QuickStartCard` - Home page quick start actions
- `TermCard` - Term overview with week counts
- `WeekCard` - Week information with themes
- `FocusCard` - Subject learning goals
- `DaySlotPanel` - Individual timetable slots
- `JumpToWeek` - Quick navigation to specific weeks
- `OnboardingChecklist` - New teacher guidance
- `ResourceLink` - Template and guide links

#### Layout Components

- `AppHeader` - Brand + breadcrumbs navigation
- `Breadcrumbs` - Hierarchical navigation breadcrumbs

### Pages

#### Home Page (`/`)

- Hero section with tagline "Plan your year. Focus your week. Teach your day."
- Quick start cards (Create Project, Choose Term & Week, Fill Weekly & Daily Plans)
- Jump to Week functionality
- Recent curriculum years overview
- Term overview grid
- Onboarding checklist
- Resources section

#### Curriculum Hub (`/curriculum`)

- Grid of Term cards (Term 1–4)
- Click to navigate to Term pages

#### Term Page (`/curriculum/term/[termId]`)

- Grid of Week cards (2 columns on medium screens)
- Week cards show: Term n: Week #, Theme, Dates
- Hover effects and chevron affordances

#### Week Page (`/weeks/[weekId]`)

- Header: Week # — Theme
- Meta row: Term, dates, Export CSV/Import buttons
- Learning Focus section: 6 subject cards (Maths, Literacy, Life Skills, Science, Creative Arts, Other)
- Daily Plans (Mon–Fri) with day buttons

#### Day Page (`/daily/[dayId]`)

- Header: Day — Week # · Theme with "Back to Week"
- 12 timetable slots (07:00-07:30 to 12:30-12:40)
- Each slot shows: time, area, theme badge, planned activity, materials
- Right column: Reflections textarea + Save Day Plan

## Technology Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Prisma + SQLite
- **Backend**: Next.js API routes

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Component Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── nav/          # Navigation components
├── app/              # Next.js app router pages
└── lib/              # Utilities and database
```

### Adding New Components

1. Create component in appropriate directory
2. Follow design system patterns (colors, spacing, shadows)
3. Add Framer Motion animations where appropriate
4. Include proper TypeScript interfaces
5. Test responsive behavior

### Design System Guidelines

- Use slate color palette for text and backgrounds
- Apply indigo for primary actions and accents
- Maintain consistent spacing (px-6, py-8, gap-6)
- Use rounded-2xl for cards and rounded-xl for buttons
- Apply shadow-sm with hover:shadow-md for cards
- Include smooth transitions (duration-200, duration-300)

## API Endpoints

- `GET /api/curriculum-years` - List all curriculum years
- `GET /api/curriculum` - Get curriculum structure
- `GET /api/weeks` - List all weeks
- `GET /api/daily/[dayId]` - Get daily entry data
- `GET /api/export/week/[weekId]` - Export week as CSV

## Contributing

1. Follow the established design system
2. Maintain responsive design principles
3. Include proper accessibility attributes
4. Test on multiple screen sizes
5. Follow TypeScript best practices

## License

Private project - All rights reserved
