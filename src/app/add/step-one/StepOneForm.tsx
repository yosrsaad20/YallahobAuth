'use client';

import { useState, useTransition } from 'react';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import { FormErrors } from '@/type';
import { stepOneFormAction } from './actions';
import { useRouter } from 'next/navigation';

export default function StepOneForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name1: '',
    name2: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle client-side validation and form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error for this field when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  // Client-side validation
  const validateClient = () => {
    let newErrors: FormErrors = {};

    if (!formData.name1) {
      newErrors.name1 = 'Nom de partenaire 1 est requis';
    }

    if (!formData.name2) {
      newErrors.name2 = 'Nom de partenaire 2 est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Perform client-side validation
    if (!validateClient()) {
      return; // Stop form submission if there are validation errors
    }

    // Create FormData object
    const formDataObj = new FormData();
    formDataObj.append('name1', formData.name1);
    formDataObj.append('name2', formData.name2);

    // Use useTransition to handle async server action
    startTransition(async () => {
      try {
        // Call server action
        const result = await stepOneFormAction({}, formDataObj);
        
        // Check if there are validation errors returned from server
        if (result && Object.keys(result).length > 0) {
          setErrors(result);
        }
        // No need to handle redirect as the server action takes care of it
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ 
          serverError: 'Une erreur est survenue. Veuillez réessayer.' 
        });
      }
    });
  };

  // Display general server error if any
  const serverError = errors?.serverError ? (
    <div className="text-red-500 mt-2">{errors.serverError}</div>
  ) : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        {serverError}
        
        <Input
          label="Nom de partenaire 1"
          id="name1"
         
          type="text"
         
          required
          errorMsg={errors?.name1}
        />
        
        <Input
          label="Nom de partenaire 2"
          id="name2"
          
          type="text"
         
          required
          errorMsg={errors?.name2}
        />

        {/* Only using the text property that's available on SubmitButton */}
        <SubmitButton text={isPending ? "En cours..." : "Continue"} />
        
        {/* If you need to disable the button, but the component doesn't support it,
            you could conditionally render it or wrap it in a div with pointer-events: none */}
        {isPending && (
          <div className="text-gray-500 text-sm text-center mt-2">
            Traitement en cours...
          </div>
        )}
      </div>
    </form>
  );
}