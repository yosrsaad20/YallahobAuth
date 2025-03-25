'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import { FormErrors } from '@/type';

export default function StepThreeForm() {
  const router = useRouter(); // Next.js router for navigation

  const [hasChildren, setHasChildren] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    nbEnfant: ''
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
      // Simulating a form submission (Replace with your actual API endpoint)
      const response = await fetch('/api/stepThreeFormAction', {
        method: 'POST',
        body: JSON.stringify({ ...formData, hasChildren }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerErrors(errorData.errors || {});
      } else {
        router.push('/add/review'); // Redirect on successful submission
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <div className="flex flex-col">
          <label className="text-lg font-medium">Avez-vous des enfants ?</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`px-4 py-2 border rounded ${
                hasChildren === true ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
              onClick={() => setHasChildren(true)}
            >
              Oui
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded ${
                hasChildren === false ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
              onClick={() => setHasChildren(false)}
            >
              Non
            </button>
          </div>
        </div>

        {hasChildren && (
          <Input
          label="Si oui, combien d’enfants avez-vous ?"
          id="nbEnfant"
          required
          type="number"
          min={1}
          errorMsg={serverErrors?.nombreEnfants}
          />
        )}

        {/* Submit button triggers form submission */}
        <SubmitButton text="Continuer" />
      </div>
    </form>
  );
}
