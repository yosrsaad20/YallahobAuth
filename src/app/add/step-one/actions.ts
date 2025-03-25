'use server';

import { stepOneSchema } from '@/schemas';
import { AddDealRoutes, FormErrors } from '@/type';
import { redirect } from 'next/navigation';

export const stepOneFormAction = async (
  prevState: FormErrors = {},
  formData: FormData
): Promise<FormErrors> => {
  // Parse and validate form data
  const data = Object.fromEntries(formData.entries());
  const validated = stepOneSchema.safeParse(data);

  if (!validated.success) {
    // Extract and format validation errors
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string;
      acc[path] = issue.message;
      return acc;
    }, {});
    
    return errors;
  }

  try {
    // Here you would typically save the data to your database
    // e.g., await db.insertDeal(validated.data);
    
    // If successful, redirect to the next page
    redirect(AddDealRoutes.COUPON_DETAILS);
  } catch (error) {
    // Handle any server errors
    console.error('Server error:', error);
    return { 
      serverError: 'Une erreur est survenue. Veuillez réessayer.' 
    };
  }
  
  // This return is needed for TypeScript, but won't be reached due to redirect
  return {};
};