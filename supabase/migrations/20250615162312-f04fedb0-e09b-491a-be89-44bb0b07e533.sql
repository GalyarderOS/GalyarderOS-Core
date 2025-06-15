
-- Clean up and standardize RLS policies for the 'profiles' table.

-- Drop old policies to avoid conflicts.
-- The names might vary slightly from previous migrations, so we drop all common variations.
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create standardized policies for 'profiles'.

-- Policy: Authenticated users can view their own profile.
CREATE POLICY "Allow authenticated users to view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Authenticated users can update their own profile.
CREATE POLICY "Allow authenticated users to update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Authenticated users can insert their own profile.
-- This is mainly for completeness. Profile creation is handled by a trigger on user signup,
-- but this policy allows for direct insertion if needed in the future.
CREATE POLICY "Allow authenticated users to insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);
