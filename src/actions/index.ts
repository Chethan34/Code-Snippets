'use server';

import { redirect } from 'next/navigation';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath('/');
  redirect('/');
}

export async function createSnippet(
    formState: {message: string}, 
    formData: FormData){
    
   try{// This needs to be a server action!

    // Check the user's inputs and make sure they're valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    //form Validation:
    if (typeof title !== 'string' || title.length < 3){
        return{
            message: "Title must be longer"
        };
    }
    if (typeof code !== "string" || code.length < 3){
        return{
            message:"Code must be longer"
        };
    }
    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
}catch(err:unknown){
if(err instanceof Error){
    return {
        message:err.message
    };
} else{
    return{
        message:'Something went wrong..'
    };
}
}   revalidatePath('/');
    // Redirect the user back to the root route
    redirect('/');
  };