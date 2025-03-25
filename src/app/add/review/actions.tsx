'use server';
import {
  NewDealType,
  stepTwoSchema,
  stepOneSchema,
  stepThreeSchema,
} from '@/schemas';
import { AddDealRoutes } from '@/type';

interface SubmitDealActionReturnType {
  redirect?: AddDealRoutes;
  errorMsg?: string;
  success?: boolean;
}

export const submitDealAction = async (
  deal: NewDealType
): Promise<SubmitDealActionReturnType> => {
  const stepOneValidated = stepOneSchema.safeParse(deal);
  if (!stepOneValidated.success) {
    return {
      redirect: AddDealRoutes.PRODUCT_INFO,
      errorMsg: 'Veuillez valider les informations',
    };
  }

  const stepTwoValidated = stepTwoSchema.safeParse(deal);
  if (!stepTwoValidated.success) {
    return {
      redirect: AddDealRoutes.COUPON_DETAILS,
      errorMsg: 'Veuillez compléter les informations relatives à votre mariage ',
    };
  }

  const stepThreeValidated = stepThreeSchema.safeParse(deal);
  if (!stepThreeValidated.success) {
    return {
      redirect: AddDealRoutes.CONTACT_INFO,
      errorMsg: 'Veuillez compléter les informations',
    };
  }

  const retVal = { success: true, redirect: AddDealRoutes.PRODUCT_INFO };
  console.log(retVal);
  return retVal;
};
