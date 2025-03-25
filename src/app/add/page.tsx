import { AddDealRoutes } from '@/type';
import { redirect } from 'next/navigation';

export default function AddPage() {
  redirect(AddDealRoutes.PRODUCT_INFO);
}
