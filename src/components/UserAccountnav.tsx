'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

export const UserAccountnav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant='destructive'
    >
      Déconnecter
    </Button>
  );
};

export default UserAccountnav;
