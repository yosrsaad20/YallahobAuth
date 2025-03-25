'use server';

import { stepTwoSchema } from '@/schemas';
import { AddDealRoutes, FormErrors } from '@/type';
import { redirect } from 'next/navigation';

export const stepTwoFormAction = async (
  prevState: FormErrors | undefined,
  formData: FormData
): Promise<FormErrors | undefined> => {
  const data = Object.fromEntries(formData.entries());
  
  const formDataWithNumbers = {
    anneesMariage: Number(data.anneesMariage),
    anneeRencontre: Number(data.anneeRencontre),
  };

  const validated = stepTwoSchema.safeParse(formDataWithNumbers);

  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string;
      acc[path] = issue.message;
      return acc;
    }, {});
    return errors;
  }

  redirect(AddDealRoutes.CONTACT_INFO);

  return undefined;
};
