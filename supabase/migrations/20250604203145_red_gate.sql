/*
  # Add language and analytics support to Content AI

  1. New Columns
    - language: Store content language
    - usage_count: Track template usage
    - average_rating: Store template rating analytics
    
  2. Functions
    - update_template_stats: Automatically update template statistics
*/

ALTER TABLE generated_content
ADD COLUMN language text NOT NULL DEFAULT 'en',
ADD COLUMN usage_count integer DEFAULT 0,
ADD COLUMN average_rating numeric DEFAULT 0;

-- Function to update template statistics
CREATE OR REPLACE FUNCTION update_template_stats()
RETURNS trigger AS $$
BEGIN
  IF NEW.rating IS NOT NULL AND OLD.rating IS NULL THEN
    -- Update average rating
    UPDATE generated_content
    SET average_rating = (
      SELECT AVG(CASE 
        WHEN rating = 'useful' THEN 1 
        WHEN rating = 'not_relevant' THEN 0 
        END)
      FROM generated_content
      WHERE template_name = NEW.template_name
      AND rating IS NOT NULL
    )
    WHERE template_name = NEW.template_name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stats when content is rated
CREATE TRIGGER content_rating_trigger
AFTER UPDATE OF rating ON generated_content
FOR EACH ROW
EXECUTE FUNCTION update_template_stats();