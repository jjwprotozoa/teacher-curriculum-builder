import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(3),
  year: z.number().int().min(2000),
  ageGroup: z.string().min(1),
})

export const upsertTermSchema = z.object({
  projectId: z.string().cuid(),
  name: z.string().min(3),
  order: z.number().int().min(1),
  startDate: z.string(),
  endDate: z.string(),
})

export const upsertWeekSchema = z.object({
  projectId: z.string().cuid(),
  termId: z.string().cuid(),
  number: z.number().int().min(1).max(60),
  title: z.string().min(3),
  startDate: z.string(),
  endDate: z.string(),
})

export const upsertWeeklyPlanSchema = z.object({
  weekId: z.string().cuid(),
  goals: z.object({
    maths: z.array(z.string()).default([]),
    literacy: z.array(z.string()).default([]),
    lifeSkills: z.array(z.string()).default([]),
    science: z.array(z.string()).default([]),
    creativeArts: z.array(z.string()).default([]),
    other: z.array(z.string()).default([]),
  }),
  notes: z.string().optional(),
  resources: z.record(z.string(), z.any()).optional(),
})

export const upsertDailyEntrySchema = z.object({
  weekId: z.string().cuid(),
  date: z.string(),
  dayOfWeek: z.enum(["MON","TUE","WED","THU","FRI","SAT","SUN"]),
  activities: z.record(z.string(), z.array(z.object({
    area: z.string(),
    activity: z.string(),
  }))),
  reflections: z.string().optional(),
})
