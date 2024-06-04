'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/signup?message=Could not authenticate User')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function UserSignUp(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?message=Could not authenticate User')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut(){
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/signin')
}