import React, { ReactNode } from 'react';

export const H8 = ({ children }: { children: ReactNode }) => {
  return (
    <h6 className="font-neue-plak-extra-condense text-[32px] not-italic font-normal leading-[80%] uppercase">
      {children}
    </h6>
  );
};
