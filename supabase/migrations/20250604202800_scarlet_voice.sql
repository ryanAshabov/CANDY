/*
  # Add content rating and template features

  1. New Columns
    - Add rating column to generated_content table
    - Add is_template column to generated_content table
    - Add template_name column to generated_content table

  2. Changes
    - Update existing table structure
    - Add new constraints for rating values
*/

ALTER TABLE generated_content
ADD COLUMN rating text CHECK (rating IN ('useful', 'not_relevant')),
ADD COLUMN is_template boolean DEFAULT false,
ADD COLUMN template_name text;

-- Index for faster template lookups
CREATE INDEX idx_generated_content_templates ON generated_content (is_template) WHERE is_template = true;