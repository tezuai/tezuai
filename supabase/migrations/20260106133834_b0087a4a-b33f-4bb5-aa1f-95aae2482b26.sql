-- Add DELETE policy for profiles table (GDPR compliance - user right to delete their data)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);