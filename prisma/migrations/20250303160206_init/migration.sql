CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for the updatedAt field to update on changes (instead of relying on @updatedAt)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
