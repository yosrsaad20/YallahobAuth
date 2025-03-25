import z from 'zod';

// Step One Schema: For the 'name' field
export const stepOneSchema = z.object({
  name1: z
    .string()
    .min(1, 'Entrer le nom de partenaire 1.') // Apply validation directly
    .optional(), // Make it optional
    name2: z
    .string()
    .min(1, 'Entrer le nom de partenaire 2.') // Apply validation directly
    .optional(), // Make it optional
});


// Step Two Schema: For the 'dateMariage', 'anneesMariage' fields
export const stepTwoSchema = z.object({
  anneesMariage: z
    .number()
    .optional(), 
    anneeRencontre: z
    .number()
    .optional(), 

});

export const stepThreeSchema = z.object({
  hasChildren: z.boolean().optional(), // Optional boolean field
  nbEnfant: z
    .number()
    .min(0)
    .max(100) // Optional, with min and max validation
    .optional(),
});

// Complete Schema combining all steps
export const newDealSchema = z.object({
  ...stepOneSchema.shape, // Includes name from step one
  ...stepTwoSchema.shape, // Includes dateMariage and anneesMariage from step two
  ...stepThreeSchema.shape, // Includes hasChildren and nbEnfant from step three
});

// Initial Values Schema: Only includes optional fields relevant for initial data
export const newDealInitialValuesSchema = z.object({
  name1: z.string().optional(),
  name2: z.string().optional(),
  anneeRencontre: z.number().optional(),
  anneesMariage: z.number().optional(),
  hasChildren: z.boolean().optional(),
  nbEnfant: z.number().optional(),
});

// Types inferred from the schemas
export type NewDealType = z.infer<typeof newDealSchema>;
export type NewDealInitialValuesType = z.infer<typeof newDealInitialValuesSchema>;
