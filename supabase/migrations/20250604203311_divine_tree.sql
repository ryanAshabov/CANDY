/*
  # Add template performance tracking

  1. New Columns
    - Add region-specific template categorization
    - Add performance metrics tracking
    - Add template categories and subcategories
  
  2. Template Analytics
    - Track usage by region
    - Track success metrics
    - Store cultural context
*/

ALTER TABLE generated_content
ADD COLUMN region text,
ADD COLUMN success_metrics jsonb DEFAULT '{
  "impressions": 0,
  "engagement": 0,
  "clicks": 0,
  "conversions": 0
}'::jsonb,
ADD COLUMN template_category text,
ADD COLUMN template_subcategory text;

-- Create template categories lookup table
CREATE TABLE template_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES template_categories(id),
  region text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add RLS to template categories
ALTER TABLE template_categories ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Anyone can read template categories"
  ON template_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can manage template categories
CREATE POLICY "Admins can manage template categories"
  ON template_categories
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Function to update template performance metrics
CREATE OR REPLACE FUNCTION update_template_metrics()
RETURNS trigger AS $$
BEGIN
  IF NEW.is_template THEN
    UPDATE generated_content
    SET usage_count = usage_count + 1
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tracking template usage
CREATE TRIGGER template_usage_trigger
AFTER INSERT ON generated_content
FOR EACH ROW
WHEN (NEW.template_name IS NOT NULL)
EXECUTE FUNCTION update_template_metrics();