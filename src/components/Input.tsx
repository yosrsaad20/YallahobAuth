'use client';

import { useAddDealContext } from '@/contexts/addDealContext';

// Declare the NewDealData type for the structure of your deal data
interface NewDealData {
  name1?: string;
  name2?: string;
  anneesMariage?: number;
  anneeRencontre?: number;
  hasChildren?: boolean;
  nbEnfant?: number;
}

interface InputProps {
  label: string;
  id: keyof NewDealData; // Ensure `id` is a key of `NewDealData`
  description?: string;
  required?: boolean;
  pattern?: string;
  type: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
}

export default function Input({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  min,
  max,
  description,
  errorMsg,
}: InputProps) {
  const { updateNewDealDetails, newDealData } = useAddDealContext();

  // Handle input change, ensuring proper value assignment
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (e.target.type === 'number') {
      // If input type is 'number', convert the value to a number first, then to string
      value = value === '' ? '' : String(Number(value));
    }

    // Update the state with the correct value (as a string)
    updateNewDealDetails({ [e.target.name]: value });
  };

  return (
    <div>
      <label className="block text-lg" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-slate-200 block mb-1">
            {description}
          </span>
        )}
      </label>
      <input
        className={`w-full rounded-md py-4 px-2 text-slate-900 ${
          errorMsg ? 'border-red-300' : 'border-slate-300'
        } border-2`}
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        min={min}
        max={max}
        onChange={handleInputChange}
      />
      <div className="min-h-8 mt-1">
        {errorMsg && (
          <span className="bg-red-500 block">{errorMsg}</span>
        )}
      </div>
    </div>
  );
}
