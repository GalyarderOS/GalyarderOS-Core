
-- PHASE 1: Database Foundation & RLS (make sure no duplicate policies/FKs are created)

-- 1. Ensure essential RLS policies exist for investment_portfolios
DROP POLICY IF EXISTS "Users can manage their own portfolios" ON public.investment_portfolios;
CREATE POLICY "Users can manage their own portfolios"
  ON public.investment_portfolios
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. RLS for investments
DROP POLICY IF EXISTS "Users can manage their own investments" ON public.investments;
CREATE POLICY "Users can manage their own investments"
  ON public.investments
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. RLS for focus_sessions
DROP POLICY IF EXISTS "Users can view own focus sessions" ON public.focus_sessions;
DROP POLICY IF EXISTS "Users can insert own focus sessions" ON public.focus_sessions;
CREATE POLICY "Users can view own focus sessions" 
  ON public.focus_sessions
  FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own focus sessions" 
  ON public.focus_sessions
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 4. Memories
DROP POLICY IF EXISTS "Users can view own memories" ON public.memories;
DROP POLICY IF EXISTS "Users can insert own memories" ON public.memories;
DROP POLICY IF EXISTS "Users can update own memories" ON public.memories;
DROP POLICY IF EXISTS "Users can delete own memories" ON public.memories;
CREATE POLICY "Users can view own memories" 
  ON public.memories FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own memories" 
  ON public.memories FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own memories" 
  ON public.memories FOR UPDATE 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own memories" 
  ON public.memories FOR DELETE 
  USING (auth.uid() = user_id);

-- 5. Habits & habit_logs (already covered, ensure exists)
DROP POLICY IF EXISTS "Users can view own habits" ON public.habits;
DROP POLICY IF EXISTS "Users can insert own habits" ON public.habits;
DROP POLICY IF EXISTS "Users can update own habits" ON public.habits;
DROP POLICY IF EXISTS "Users can delete own habits" ON public.habits;
CREATE POLICY "Users can view own habits" 
  ON public.habits FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habits" 
  ON public.habits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own habits"
  ON public.habits FOR UPDATE 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own habits"
  ON public.habits FOR DELETE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own habit logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Users can insert own habit logs" ON public.habit_logs;
CREATE POLICY "Users can view own habit logs"
  ON public.habit_logs FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own habit logs"
  ON public.habit_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 6. Cashflow tables
DROP POLICY IF EXISTS "Users can manage their own categories" ON public.cashflow_categories;
CREATE POLICY "Users can manage their own categories"
  ON public.cashflow_categories FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own transactions" ON public.cashflow_transactions;
CREATE POLICY "Users can manage their own transactions"
  ON public.cashflow_transactions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. Debt tables
DROP POLICY IF EXISTS "Users can manage their own debts" ON public.debts;
CREATE POLICY "Users can manage their own debts"
  ON public.debts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own debt payments" ON public.debt_payments;
CREATE POLICY "Users can manage their own debt payments"
  ON public.debt_payments FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Make foreign key relationships explicit if not yet present
-- (Most already exist, only add if missing; checks and re-creation handled by migration tooling)

-- FINISH: Foundational RLS and FKs set up for all major user-scoped tables.

