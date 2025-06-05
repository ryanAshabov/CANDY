/*
  # Create promotions table

  1. New Tables
    - `promotions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `description` (text)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `discount_percent` (integer)
      - `active` (boolean)
  2. Security
    - Enable RLS on `promotions` table
    - Add policies for authenticated users to manage promotions
*/

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  discount_percent integer NOT NULL,
  active boolean NOT NULL DEFAULT true
);

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Policy for reading promotions
CREATE POLICY "Anyone can read promotions"
  ON promotions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for creating promotions
CREATE POLICY "Authenticated users can create promotions"
  ON promotions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy for updating promotions
CREATE POLICY "Authenticated users can update promotions"
  ON promotions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Policy for deleting promotions
CREATE POLICY "Authenticated users can delete promotions"
  ON promotions
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);