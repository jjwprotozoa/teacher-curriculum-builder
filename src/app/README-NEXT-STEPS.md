# 📦 Curriculum Builder – v0.2 Implementation Pack

Below is a single-file drop-in you can paste into your project to move from skeleton → functional MVP. Each section starts with a file path comment. Copy the parts you want into your codebase. Order of work is in the final section.

---

## 🚀 Implementation Order

### 1) ENV & Prisma Setup

- Ensure `DATABASE_URL="file:./dev.db"` in `.env`
- Run: `npx prisma generate && npx prisma migrate dev -n init`
- Run: `npx prisma db seed` to populate with sample data

### 2) Test Core Functionality

- Visit `/curriculum-years` → create/open curriculum year → verify weeks list and links
- Test weekly plan editing → add goals & notes → Save
- Test daily entries → add slots and activities → Save
- Test CSV export → verify downloaded CSV contents

### 3) Enhance UI (Optional)

- Replace basic HTML with your shadcn/ui components
- Add proper error handling and loading states
- Implement form validation feedback

### 4) AI Integration (Future)

- Implement `/api/ai` proxy to Ollama (local) + cloud
- Wire AI suggestions to WeeklyPlan UI
- Add theme generation for weeks

### 5) Advanced Features (Future)

- Add authentication & multi-user curriculum years
- Implement project templates
- Add bulk operations for weeks/days
- Real-time collaboration features

---

## 🔧 Current Features

✅ **Curriculum Year Management**: Create and manage curriculum years
✅ **Term Structure**: 4-term academic year with configurable dates
✅ **Weekly Planning**: 43 weeks with learning goals and notes
✅ **Daily Scheduling**: Time-slot based activity planning
✅ **Data Export**: CSV export for reporting and analysis
✅ **Responsive UI**: Mobile-friendly interface

---

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── curriculum-years/route.ts          # Curriculum Year CRUD
│   │   ├── terms/route.ts             # Term management
│   │   ├── weeks/route.ts             # Week management
│   │   ├── weekly-plan/route.ts       # Weekly plan CRUD
│   │   ├── daily/route.ts             # Daily entry CRUD
│   │   └── export/[projectId]/route.ts # CSV export
│   ├── curriculum-years/
│   │   ├── page.tsx                   # Curriculum Years list
│   │   └── [projectId]/page.tsx      # Project detail
│   ├── weeks/
│   │   ├── [weekId]/page.tsx         # Weekly plan editor
│   │   └── [weekId]/daily/page.tsx   # Daily entries
│   └── page.tsx                       # Landing page
├── lib/
│   ├── db.ts                          # Prisma client
│   ├── zod.ts                         # Validation schemas
│   ├── export.ts                      # CSV export utilities
│   └── ai.ts                          # AI integration (placeholder)
└── prisma/
    ├── schema.prisma                  # Database schema
    └── seed.ts                        # Sample data
```

---

## 🎯 Next Development Priorities

1. **Error Handling**: Add proper error boundaries and user feedback
2. **Data Validation**: Enhance form validation and error messages
3. **UI Polish**: Implement loading states and better visual feedback
4. **Search & Filter**: Add search functionality for curriculum years and weeks
5. **Bulk Operations**: Allow editing multiple weeks/days at once
6. **Templates**: Pre-built curriculum templates for common age groups
7. **Analytics**: Track curriculum completion and learning outcomes
8. **Mobile App**: Consider PWA or React Native for mobile use

---

## 🐛 Known Issues & Limitations

- Basic UI styling (intentionally minimal for MVP)
- No authentication (single-user for now)
- Limited error handling
- No data backup/restore functionality
- CSV export is basic (could be enhanced with Excel format)

---

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

_Ready to build amazing curricula! 🎓_
