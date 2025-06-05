/*
  # Event-Based Template System

  1. New Tables
    - `template_events`
      - Stores cultural and seasonal events
      - Includes dates, regions, and metadata
    - `template_event_rules`
      - Defines suggestion rules for events
      - Links templates to events with conditions

  2. Changes
    - Add event tracking to generated_content
    - Add notification preferences to users table
    
  3. Functions
    - Event suggestion scoring
    - Template cloning with event context
    - Notification trigger system
*/

-- Create template events table
CREATE TABLE template_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  regions text[] NOT NULL,
  type text NOT NULL CHECK (type IN ('cultural', 'seasonal', 'holiday')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create template event rules table
CREATE TABLE template_event_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES template_events(id) ON DELETE CASCADE,
  template_id uuid REFERENCES generated_content(id) ON DELETE CASCADE,
  priority integer DEFAULT 0,
  conditions jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add event tracking to generated_content
ALTER TABLE generated_content
ADD COLUMN event_id uuid REFERENCES template_events(id),
ADD COLUMN event_performance jsonb DEFAULT '{
  "impressions": 0,
  "engagement": 0,
  "conversions": 0,
  "revenue": 0
}'::jsonb;

-- Add notification preferences to users
ALTER TABLE users
ADD COLUMN notification_preferences jsonb DEFAULT '{
  "event_suggestions": true,
  "template_performance": true,
  "scheduled_content": true
}'::jsonb;

-- Enable RLS
ALTER TABLE template_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_event_rules ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read template events"
  ON template_events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage template events"
  ON template_events
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Anyone can read template event rules"
  ON template_event_rules
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage template event rules"
  ON template_event_rules
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Function to clone template for new event
CREATE OR REPLACE FUNCTION clone_template_for_event(
  template_id uuid,
  event_id uuid,
  new_context jsonb
)
RETURNS uuid AS $$
DECLARE
  new_template_id uuid;
  source_template generated_content;
BEGIN
  -- Get source template
  SELECT * INTO source_template
  FROM generated_content
  WHERE id = template_id;
  
  -- Create new template
  INSERT INTO generated_content (
    user_id,
    prompt,
    content,
    type,
    status,
    language,
    region,
    is_template,
    template_name,
    template_category,
    event_id,
    suggestion_context
  )
  VALUES (
    source_template.user_id,
    source_template.prompt,
    source_template.content,
    source_template.type,
    'draft',
    source_template.language,
    source_template.region,
    true,
    source_template.template_name || ' - ' || (new_context->>'event_name'),
    source_template.template_category,
    event_id,
    new_context
  )
  RETURNING id INTO new_template_id;
  
  RETURN new_template_id;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate event-based suggestion score
CREATE OR REPLACE FUNCTION calculate_event_suggestion_score(
  template_id uuid,
  event_id uuid
)
RETURNS numeric AS $$
DECLARE
  base_score numeric;
  event_multiplier numeric;
  seasonal_bonus numeric;
BEGIN
  -- Get base template score
  SELECT suggestion_score INTO base_score
  FROM generated_content
  WHERE id = template_id;
  
  -- Calculate event relevance multiplier
  SELECT 
    CASE 
      WHEN now() BETWEEN start_date AND end_date THEN 2.0
      WHEN now() < start_date AND start_date - now() <= interval '14 days' THEN 1.5
      ELSE 1.0
    END INTO event_multiplier
  FROM template_events
  WHERE id = event_id;
  
  -- Add seasonal performance bonus
  SELECT 
    CASE 
      WHEN (event_performance->>'conversions')::numeric > 100 THEN 0.3
      WHEN (event_performance->>'engagement')::numeric > 1000 THEN 0.2
      ELSE 0.0
    END INTO seasonal_bonus
  FROM generated_content
  WHERE id = template_id;
  
  RETURN (base_score * event_multiplier) + seasonal_bonus;
END;
$$ LANGUAGE plpgsql;