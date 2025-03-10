'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { toast } from 'sonner'; // Corrected import
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton'; // Import for GoogleSignInButton
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, "L'e-mail est requis").email('E-mail invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit comporter plus de 8 caractères'),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const SignInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (SignInData?.error) {
      toast.error('Oops, something went wrong!');
    } else {
      toast.success('Connexion réussie !');
      router.refresh();
      router.push('/admin');
    }
  };

  const handleGoogleSignIn = async () => {
    const googleResponse = await signIn('google', { redirect: false });
    if (googleResponse?.error) {
      toast.error('Google authentication failed');
    } else {
      toast.success('Connexion avec Google réussie !');
      router.push('/admin');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Se connecter
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        ou
      </div>
      <GoogleSignInButton onClick={handleGoogleSignIn}>Se connecter avec Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Si vous n&apos;avez pas de compte, veuillez&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          vous inscrire
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
