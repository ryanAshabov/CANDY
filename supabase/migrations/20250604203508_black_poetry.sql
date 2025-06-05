/*
  # Add template suggestion features

  1. New Tables
    - template_suggestions
      - Stores suggestion rules and conditions
    - template_performance_metrics
      - Tracks detailed performance data

  2. Changes
    - Add suggestion-related fields to generated_content
    - Add performance tracking triggers

  3. Security
    - Enable RLS on new tables
    - Add appropriate policies
*/

-- Create template suggestions table
CREATE TABLE template_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES generated_content(id),
  condition_type text NOT NULL CHECK (condition_type IN ('region', 'language', 'event', 'performance')),
  condition_value jsonb NOT NULL,
  priority integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create performance metrics table
CREATE TABLE template_performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES generated_content(id),
  metric_type text NOT NULL CHECK (metric_type IN ('usage', 'rating', 'engagement', 'conversion')),
  metric_value numeric NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

-- Add suggestion fields to generated_content
ALTER TABLE generated_content
ADD COLUMN suggestion_score numeric DEFAULT 0,
ADD COLUMN last_suggested_at timestamptz,
ADD COLUMN suggestion_context jsonb DEFAULT '{}'::jsonb;

-- Enable RLS
ALTER TABLE template_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read template suggestions"
  ON template_suggestions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage template suggestions"
  ON template_suggestions
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read performance metrics"
  ON template_performance_metrics
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update suggestion scores
CREATE OR REPLACE FUNCTION update_suggestion_scores()
RETURNS trigger AS $$
BEGIN
  -- Update suggestion score based on various metrics
  UPDATE generated_content
  SET suggestion_score = (
    COALESCE(usage_count, 0) * 0.3 +
    COALESCE(average_rating, 0) * 0.4 +
    COALESCE((success_metrics->>'engagement')::numeric, 0) * 0.2 +
    COALESCE((success_metrics->>'conversions')::numeric, 0) * 0.1
  )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating suggestion scores
CREATE TRIGGER update_suggestion_scores_trigger
AFTER UPDATE OF usage_count, average_rating, success_metrics
ON generated_content
FOR EACH ROW
EXECUTE FUNCTION update_suggestion_scores();