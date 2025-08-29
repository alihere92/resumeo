import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Download, ArrowLeft, FileText, Settings, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PDFExportPage = () => {
  const { toast } = useToast();
  const [paperSize, setPaperSize] = useState("letter");
  const [orientation, setOrientation] = useState("portrait");
  const [quality, setQuality] = useState("high");
  const [includePhotos, setIncludePhotos] = useState(true);
  const [includeColors, setIncludeColors] = useState(true);
  const [optimizeForPrint, setOptimizeForPrint] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "PDF Generated Successfully!",
        description: "Your resume has been exported as a high-quality PDF.",
      });
      
      // In a real implementation, this would trigger a download
      const link = document.createElement('a');
      link.href = '/placeholder.pdf'; // This would be the actual PDF blob URL
      link.download = 'my-resume.pdf';
      link.click();
    }, 2000);
  };

  const exportOptions = [
    {
      title: "Standard PDF",
      description: "High-quality PDF optimized for digital viewing and email",
      recommended: true,
      size: "~200KB"
    },
    {
      title: "Print-Optimized PDF", 
      description: "PDF optimized for professional printing with crisp text",
      recommended: false,
      size: "~350KB"
    },
    {
      title: "ATS-Friendly PDF",
      description: "Simple formatting that works best with tracking systems",
      recommended: false,
      size: "~150KB"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <Download className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">PDF Export</h1>
                <p className="text-muted-foreground">Export your resume as a professional PDF document</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Export Settings
                </CardTitle>
                <CardDescription>
                  Customize your PDF export options for the best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="paperSize">Paper Size</Label>
                  <Select value={paperSize} onValueChange={setPaperSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">Letter (8.5" × 11")</SelectItem>
                      <SelectItem value="a4">A4 (210mm × 297mm)</SelectItem>
                      <SelectItem value="legal">Legal (8.5" × 14")</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientation</Label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select orientation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Quality (Recommended)</SelectItem>
                      <SelectItem value="medium">Medium Quality</SelectItem>
                      <SelectItem value="low">Low Quality (Smallest file)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="photos">Include Photos</Label>
                      <p className="text-sm text-muted-foreground">Include profile photos and images</p>
                    </div>
                    <Switch
                      id="photos"
                      checked={includePhotos}
                      onCheckedChange={setIncludePhotos}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="colors">Include Colors</Label>
                      <p className="text-sm text-muted-foreground">Preserve template colors and styling</p>
                    </div>
                    <Switch
                      id="colors"
                      checked={includeColors}
                      onCheckedChange={setIncludeColors}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="print">Optimize for Print</Label>
                      <p className="text-sm text-muted-foreground">Use print-friendly formatting</p>
                    </div>
                    <Switch
                      id="print"
                      checked={optimizeForPrint}
                      onCheckedChange={setOptimizeForPrint}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full bg-gradient-hero hover:opacity-90" 
              size="lg"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>

          {/* Export Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Choose the best export option for your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exportOptions.map((option, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{option.title}</h4>
                          {option.recommended && (
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                        <p className="text-xs text-muted-foreground">File size: {option.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>PDF Export Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Use High Quality for Applications</p>
                    <p className="text-sm text-muted-foreground">High quality ensures your resume looks professional when viewed on any device</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">ATS-Friendly for Online Applications</p>
                    <p className="text-sm text-muted-foreground">Use ATS-friendly export when applying through job portals and company websites</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Print-Optimized for Hard Copies</p>
                    <p className="text-sm text-muted-foreground">Choose print-optimized when you need to print your resume for interviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFExportPage;