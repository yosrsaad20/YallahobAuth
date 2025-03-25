'use client';
import SubmitButton from '../../../components/SubmitButton';
import { submitDealAction } from './actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAddDealContext } from '@/contexts/addDealContext';
import { NewDealType } from '@/schemas';

export default function ReviewForm() {
  const router = useRouter();
  const { newDealData, resetLocalStorage } = useAddDealContext();

  const { name1,name2, anneeRencontre, anneesMariage, hasChildren, nbEnfant } =
    newDealData;

  const handleFormSubmit = async (formData: FormData) => {
    const res = await submitDealAction(newDealData as NewDealType);
    const { redirect, errorMsg, success } = res;

    if (success) {
      toast.success('Félicitations, votre profil est prêt !');
      resetLocalStorage();
    } else if (errorMsg) {
      toast.error(errorMsg);
    }
    if (redirect) {
      return router.push(redirect);
    }
  };

  return (
    <form
      action={handleFormSubmit}
      className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]"
    >
      <p className="text-black/90">Nom de partenaire 1: {name1}</p>
      <p className="text-black/90">Nom de partenaire 2: {name2}</p>
      <p className="text-black/90">Années de rencontre: {anneeRencontre}</p>
      <p className="text-black/90">Années de mariage: {anneesMariage}</p>
      <p className="text-black/90">avez vous des enfants ?: {hasChildren ? 'Yes' : 'No'}</p>
      <p className="text-black/90">
        Nombre des enfants: {hasChildren ? nbEnfant : 'N/A'}
      </p>

      <SubmitButton text="Enregistrer" />
    </form>
  );
}
