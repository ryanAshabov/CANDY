/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `inventory` (integer)
      - `image_url` (text)
      - `category` (text)
  2. Security
    - Enable RLS on `products` table
    - Add policies for authenticated users to read, create, update, and delete products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10, 2) NOT NULL,
  inventory integer NOT NULL DEFAULT 0,
  image_url text,
  category text NOT NULL
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for reading products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for creating products
CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy for updating products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Policy for deleting products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);