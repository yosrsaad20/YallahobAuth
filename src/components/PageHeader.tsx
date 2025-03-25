import React from 'react';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 className="mb-4 text-4xl font-semibold text-black md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <span className="text-sm font-light text-black md:text-2xl">
          {subtitle}
        </span>
      )}
    </>
  );
}
