import {z} from "zod"

export const MessageSchema = z.object({
    content: z.string().min(10, 
        {message:'Content must be 10 Char'}).max(300,
        {message:'content must be not more than 300 char'})
  
})