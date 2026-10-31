import * as z from 'zod/mini';

const phone = /^[0-9+()\-.\s]{7,25}$/;

// Accepts "example.com" as well as full URLs; the API adds the scheme.
const website = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i;

const text = (min, max, message) => z.string().check(z.trim(), z.minLength(min, message), z.maxLength(max));
const email = (message) => z.string().check(z.trim(), z.email(message), z.maxLength(190));
const blankOr = (pattern, message) =>
  z.string().check(z.trim(), z.refine((value) => value === '' || pattern.test(value), message));

export const consultationSchema = z.object({
  full_name: text(2, 120, 'Please enter your full name.'),
  business_name: text(2, 160, 'Please enter your business name.'),
  email: email('Please enter a valid business email.'),
  phone: z.string().check(z.trim(), z.regex(phone, 'Please enter a valid phone number.')),
  website: blankOr(website, 'Please enter a valid website address.'),
  service_id: z.string().check(z.minLength(1, 'Please choose a service.')),
  budget: z.string(),
  message: text(10, 3000, 'Please tell us a little more about your goals.'),
  company_fax: z.optional(z.string()),
});

export const contactSchema = z.object({
  name: text(2, 120, 'Please enter your name.'),
  email: email('Please enter a valid email address.'),
  phone: blankOr(phone, 'Please enter a valid phone number.'),
  subject: z.string().check(z.trim(), z.maxLength(160)),
  message: text(10, 3000, 'Please add a little more detail.'),
  company_fax: z.optional(z.string()),
});
