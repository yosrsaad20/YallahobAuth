import React from 'react';
import PageHeader from '@/components/PageHeader';
import StepNavigation from '@/components/StepNavigation';
import { AddDealContextProvider } from '@/contexts/addDealContext';

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-4 lg:px-0 text-black dark:text-black text-sm mt-[400px]"> {/* Add mt-[60px] or adjust based on your navbar height */}
      <div className="max-w-4xl mx-auto"> {/* Conteneur centré et avec une largeur limitée */}
        {/* Page Header centré */}
        <div className="text-center mb-8"> {/* Centrage du titre et du sous-titre */}
          <PageHeader
            title="Ensemble, mieux vous connaître"
            subtitle="Ce formulaire nous permet de mieux vous connaître pour vous offrir un service personnalisé et adapté à vos besoins en tant que couple marié. Nous vous remercions de votre confiance !"
          />
        </div>

        {/* Contenu principal avec des espacements ajustés */}
        <div className="mt-12 mb-12 flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* StepNavigation is placed below the header but higher than the main content */}
          <div className="lg:w-1/4">
            <StepNavigation />
          </div>

          {/* Content Section */}
          <AddDealContextProvider>
            <div className="w-full text-black dark:text-black">
              {children}
            </div>
          </AddDealContextProvider>
        </div>
      </div>
    </div>
  );
}
