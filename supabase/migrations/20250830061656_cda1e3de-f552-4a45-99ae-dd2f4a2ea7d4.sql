-- Create resumes table
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'Modern Professional',
  content JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  downloads INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own resumes" 
ON public.resumes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes" 
ON public.resumes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" 
ON public.resumes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" 
ON public.resumes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON public.resumes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.resumes (user_id, title, template, content, status, downloads) VALUES
-- We'll use a placeholder UUID that will be replaced by actual user IDs when users sign up
('00000000-0000-0000-0000-000000000000', 'Software Engineer Resume', 'Modern Professional', '{"sections": {"personal": {"name": "John Doe", "email": "john@example.com", "phone": "+1 (555) 123-4567", "location": "San Francisco, CA"}, "summary": "Experienced software engineer with 5+ years developing scalable web applications", "experience": [{"company": "Tech Corp", "position": "Senior Software Engineer", "duration": "2021-Present", "description": "Led development of microservices architecture serving 1M+ users"}], "education": [{"school": "University of Technology", "degree": "Bachelor of Computer Science", "year": "2019"}], "skills": ["JavaScript", "React", "Node.js", "Python", "AWS"]}}', 'completed', 5),
('00000000-0000-0000-0000-000000000000', 'Marketing Manager CV', 'Creative Blue', '{"sections": {"personal": {"name": "Sarah Smith", "email": "sarah@example.com", "phone": "+1 (555) 987-6543", "location": "New York, NY"}, "summary": "Results-driven marketing manager with expertise in digital campaigns", "experience": [{"company": "Marketing Pro", "position": "Marketing Manager", "duration": "2020-Present", "description": "Increased conversion rates by 40% through data-driven campaigns"}], "education": [{"school": "Business University", "degree": "Master of Marketing", "year": "2020"}], "skills": ["Digital Marketing", "SEO", "Google Analytics", "Content Strategy"]}}', 'draft', 2),
('00000000-0000-0000-0000-000000000000', 'Product Designer Portfolio', 'Minimal Clean', '{"sections": {"personal": {"name": "Alex Chen", "email": "alex@example.com", "phone": "+1 (555) 456-7890", "location": "Los Angeles, CA"}, "summary": "Creative product designer focused on user-centered design", "experience": [{"company": "Design Studio", "position": "Senior Product Designer", "duration": "2019-Present", "description": "Designed award-winning mobile apps with 4.8+ App Store ratings"}], "education": [{"school": "Art Institute", "degree": "Bachelor of Design", "year": "2018"}], "skills": ["Figma", "Sketch", "Prototyping", "User Research", "UI/UX"]}}', 'completed', 12);

-- Create password reset tokens table for forgot password functionality
CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on password reset tokens
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy for password reset tokens (only the system should access these)
CREATE POLICY "System can manage password reset tokens"
ON public.password_reset_tokens
FOR ALL
USING (false); -- No direct access through client