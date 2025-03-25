'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import { FormErrors } from '@/type';

export default function StepTwoForm() {
  const [formData, setFormData] = useState({
    anneesMariage: '',
    anneeRencontre: ''
  });

  const [serverErrors, setServerErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Simulating form action (you can replace this with an actual API call)
      const response = await fetch('/api/stepTwoFormAction', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerErrors(errorData.errors || {});
      } else {
        console.log('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input
        label="Nombre d'années de rencontre"
        id="anneeRencontre"
        required
        type="number"
        min={0}
        errorMsg={serverErrors?.anneeRencontre}
        />
        <Input
           label="Nombre d'années de mariage"
           id="anneesMariage"
           required
           type="number"
           min={0}
           errorMsg={serverErrors?.anneesMariage}
        />
        <SubmitButton text="Continue" />
      </div>
    </form>
  );
}
