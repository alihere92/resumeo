import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Calendar,
  MoreHorizontal,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { resumes, loading, stats, createResume, deleteResume, incrementDownloads } = useResumes();

  const handleCreateResume = async () => {
    const resume = await createResume("Untitled Resume");
    if (resume) {
      navigate(`/editor/${resume.id}`);
    }
  };

  const handleAction = (action: string, resumeTitle: string, resumeId?: string) => {
    switch (action) {
      case "Edit":
        if (resumeId) navigate(`/editor/${resumeId}`);
        break;
      case "Download":
        if (resumeId) {
          incrementDownloads(resumeId);
          toast({
            title: "Download Started",
            description: `Downloading "${resumeTitle}" as PDF`,
          });
        }
        break;
      case "Delete":
        if (resumeId) deleteResume(resumeId);
        break;
      default:
        toast({
          title: `${action} Resume`,
          description: `${action} "${resumeTitle}" successfully.`,
        });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success hover:bg-success/20';
      case 'draft':
        return 'bg-warning/10 text-warning hover:bg-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
              <p className="text-muted-foreground">Manage and create your professional resumes</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateResume}
                className="bg-gradient-hero hover:opacity-90 transition-opacity"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                  <p className="text-2xl font-bold">{stats.downloads}</p>
                </div>
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Download className="h-4 w-4 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <div className="text-success text-sm font-bold">✓</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                </div>
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Edit className="h-4 w-4 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create New Resume Card */}
          <Card 
            className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group h-48"
            onClick={handleCreateResume}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Create New Resume</h3>
              <p className="text-muted-foreground text-center text-sm">
                Start building your perfect resume
              </p>
            </CardContent>
          </Card>

          {/* Resume Cards */}
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-md transition-all duration-200 group h-48">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-1">{resume.title}</CardTitle>
                    <CardDescription className="text-sm">{resume.template}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("Edit", resume.title, resume.id)}>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Preview", resume.title, resume.id)}>
                        <Eye className="mr-2 h-3 w-3" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Duplicate", resume.title, resume.id)}>
                        <Copy className="mr-2 h-3 w-3" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Download", resume.title, resume.id)}>
                        <Download className="mr-2 h-3 w-3" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleAction("Delete", resume.title, resume.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  {/* Status Badge */}
                  <Badge className={`${getStatusColor(resume.status)} text-xs`}>
                    {resume.status === 'completed' ? 'Completed' : 'Draft'}
                  </Badge>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(resume.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resume.downloads}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 h-7 text-xs"
                    onClick={() => handleAction("Edit", resume.title, resume.id)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 h-7 text-xs bg-gradient-hero hover:opacity-90"
                    onClick={() => handleAction("Download", resume.title, resume.id)}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {resumes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first resume. Our AI-powered builder will guide you through the process.
            </p>
            <Button 
              onClick={handleCreateResume}
              className="bg-gradient-hero hover:opacity-90 transition-opacity"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Resume
            </Button>
          </div>
        )}

        {/* Logout Button - Bottom Left */}
        <div className="fixed bottom-4 left-4 z-10">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm hover:bg-background"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;