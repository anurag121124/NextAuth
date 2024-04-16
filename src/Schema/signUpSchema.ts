import { z } from 'zod';

export const passwordValidation = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be no more than 20 characters");

export const emailValidation = z
    .string()
    .email("Email is not valid");

export const phoneValidation = z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be no more than 10 characters");

export const usenameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const signUpSchema = z.object({
    username: usenameValidation,
    email: emailValidation,
    password: passwordValidation,
    phone: phoneValidation
});
