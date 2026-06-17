import { z } from "zod";

//creating schema/ or interface for todo with zod
//z.string() - Must be a string

//describe() - explaining what the field is useful for generating API documentation later.

//optional() - optional
export const todoValidationSchema = z.object({
    id: z.string().describe('ID of the todo'),
    title: z.string().describe('title of the todo'),
    description: z.string().optional().describe('description of todo'),
    isCompleted: z.boolean().default(false).describe('if the todo item is completed or not')
})

//typescript typing on the go with zod which mean whatever we change in the schema it automatically sync 
export type Todo = z.infer<typeof todoValidationSchema>


// //creating schema/ or interface for todo
// export interface ITodo {
//     id: string
//     title: string
//     description?: string
//     isCompleted: boolean
// }