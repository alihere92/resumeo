import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Resume {
  id: string;
  title: string;
  template: string;
  content: any;
  status: string;
  downloads: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchResumes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (title: string, template: string = 'Modern Professional') => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert([{
          user_id: user.id,
          title,
          template,
          content: {
            sections: {
              personal: { name: '', email: '', phone: '', location: '' },
              summary: '',
              experience: [],
              education: [],
              skills: []
            }
          },
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Resume created successfully"
      });

      return data;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateResume = async (id: string, updates: Partial<Resume>) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => prev.map(resume => 
        resume.id === id ? { ...resume, ...data } : resume
      ));

      return data;
    } catch (error) {
      console.error('Error updating resume:', error);
      toast({
        title: "Error",
        description: "Failed to update resume",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setResumes(prev => prev.filter(resume => resume.id !== id));
      toast({
        title: "Success",
        description: "Resume deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive"
      });
    }
  };

  const incrementDownloads = async (id: string) => {
    try {
      const resume = resumes.find(r => r.id === id);
      if (!resume) return;

      await updateResume(id, { downloads: resume.downloads + 1 });
    } catch (error) {
      console.error('Error incrementing downloads:', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  const stats = {
    total: resumes.length,
    downloads: resumes.reduce((sum, resume) => sum + resume.downloads, 0),
    completed: resumes.filter(r => r.status === 'completed').length,
    inProgress: resumes.filter(r => r.status === 'draft').length
  };

  return {
    resumes,
    loading,
    stats,
    createResume,
    updateResume,
    deleteResume,
    incrementDownloads,
    refetch: fetchResumes
  };
};