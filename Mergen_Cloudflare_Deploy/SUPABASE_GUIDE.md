# How to Connect Mergen to Supabase

To make your application real (storing data in the cloud instead of your browser), we will use **Supabase**.

## Phase 1: Setup Supabase
1.  Go to [Supabase.com](https://supabase.com) and "Start your project".
2.  Create a new project (Name: `Mergen`, Password: *secure_password*, Region: *closest to you*).
3.  Wait for the database to setup (approx 1-2 mins).

## Phase 2: Database Structure
1.  In your Supabase Dashboard, go to the **SQL Editor** (icon on the left).
2.  Click **New Query**.
3.  Copy and Paste the content from the file `supabase_schema.sql` (I have created this file for you in your project folder).
4.  Click **Run**.
    *   This creates the `surveys` table, `profiles` table, and sets up security policies.

## Phase 3: Get API Keys
1.  Go to **Project Settings** (Cog icon) > **API**.
2.  Find the `Project URL` and `anon` / `public` Key.
3.  You will need these two strings to connect your code.

## Phase 4: Update Code
Once you have the keys, we need to update `js/components.js` or a new config file with these credentials.

*Note: Since we are deploying a static site to Cloudflare, these keys will be visible to users. The "Row Level Security" (RLS) policies we set up in Phase 2 prevent users from editing each other's data.*
