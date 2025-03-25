'use server';

import { stepThreeSchema } from '@/schemas';
import { AddDealRoutes, FormErrors } from '@/type';
import { redirect } from 'next/navigation';

export const stepThreeFormAction = async (
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> => {
  const data = Object.fromEntries(formData.entries());
  const validated = stepThreeSchema.safeParse(data);
  console.log(validated.success);
  
  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string;
      acc[path] = issue.message;
      return acc;
    }, {});
    
    return errors;
  }

  // Perform the redirect after successful validation
  redirect(AddDealRoutes.REVIEW_DEAL);

  // Explicitly return undefined to satisfy the expected return type
  return undefined;
};
