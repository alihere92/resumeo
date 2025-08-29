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
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Mock data for resumes
  const [resumes] = useState([
    {
      id: 1,
      title: "Software Engineer Resume",
      template: "Modern Professional",
      lastModified: "2024-01-15",
      status: "completed",
      downloads: 5
    },
    {
      id: 2,
      title: "Marketing Manager CV",
      template: "Creative Blue",
      lastModified: "2024-01-10",
      status: "draft",
      downloads: 2
    },
    {
      id: 3,
      title: "Product Designer Portfolio",
      template: "Minimal Clean",
      lastModified: "2024-01-08",
      status: "completed",
      downloads: 12
    }
  ]);

  const handleAction = (action: string, resumeTitle: string) => {
    toast({
      title: `${action} Resume`,
      description: `${action} "${resumeTitle}" successfully.`,
    });
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
              <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
                <Plus className="mr-2 h-4 w-4" />
                Create New Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
                  <p className="text-2xl font-bold">{resumes.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                  <p className="text-2xl font-bold">
                    {resumes.reduce((sum, resume) => sum + resume.downloads, 0)}
                  </p>
                </div>
                <Download className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {resumes.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <Badge className="h-8 w-8 rounded-full bg-success/10 text-success">
                  ✓
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {resumes.filter(r => r.status === 'draft').length}
                  </p>
                </div>
                <Edit className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Resume Card */}
          <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center p-8 h-64">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create New Resume</h3>
              <p className="text-muted-foreground text-center text-sm">
                Start building your perfect resume with our AI-powered builder
              </p>
            </CardContent>
          </Card>

          {/* Resume Cards */}
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{resume.title}</CardTitle>
                    <CardDescription className="mt-1">{resume.template}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("Edit", resume.title)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Preview", resume.title)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Duplicate", resume.title)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("Download", resume.title)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleAction("Delete", resume.title)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Status Badge */}
                  <Badge className={getStatusColor(resume.status)}>
                    {resume.status === 'completed' ? 'Completed' : 'Draft'}
                  </Badge>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(resume.lastModified).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {resume.downloads} downloads
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAction("Edit", resume.title)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-hero hover:opacity-90"
                      onClick={() => handleAction("Download", resume.title)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              // This will be connected to the actual signOut function
              localStorage.clear();
              window.location.href = '/signin';
            }}
            className="w-48"
          >
            Logout
          </Button>
        </div>

        {/* Empty State (if no resumes) */}
        {resumes.length === 0 && (
          <div className="text-center py-16">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first resume. Our AI-powered builder will guide you through the process.
            </p>
            <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Resume
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;