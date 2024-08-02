import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({ required_error: "This Fill is Required!" }),
    year: z.string({ required_error: "This Fill is Required!" }),
    startMonth: z.string({ required_error: "This Fill is Required!" }),
    endMonth: z.string({ required_error: "This Fill is Required!" })
})

export const academicFacultySchema = z.object({
    name: z.string({ required_error: "This Fill is Required!" }),
})

export const academicDepartmentSchema = z.object({
    name: z.string({ required_error: "This Fill is Required!" }),
    academicFaculty: z.string({ required_error: "This Fill is Required!" }),
})