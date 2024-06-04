'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function emailLogin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect('/signup?message=Could not authenticate User');
  }

  revalidatePath('/');
  return redirect('/');
}

export async function UserSignUp(formData: FormData) {
  const supabase = createClient();

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signUpError) {
    return redirect('/signup?message=Could not sign up user');
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: signUpData?.user?.id,
      name: data.name,
      email: data.email,
    });

  if (profileError) {
    return redirect('/signup?message=Could not create user profile');
  }

  revalidatePath('/');
  return redirect('/');
}


export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/signin');
}

export async function oAuth() {
  const supabase = createClient();
  const origin = headers().get('origin') || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/signin?message=Could not redirect in OAuth');
  }

  return redirect(data.url);
}


export default async function storeBio(formData: { bio: any; }, bioText?: any) {
  const supabase = createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        bio: formData.bio,
      });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to store bio' };
  }
}