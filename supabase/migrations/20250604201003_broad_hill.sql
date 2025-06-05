/*
  # Content AI Storage Implementation

  1. New Tables
    - `generated_content`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `prompt` (text) - The user's input prompt
      - `content` (text) - Generated content
      - `type` (text) - Content type (social, whatsapp, email)
      - `status` (text) - Content status (draft, published)
      - `created_at` (timestamp)
      - `published_at` (timestamp)
    
  2. Security
    - Enable RLS on generated_content table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('social', 'whatsapp', 'email')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  published_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can create their own content"
  ON generated_content
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own content"
  ON generated_content
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own content"
  ON generated_content
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content"
  ON generated_content
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);