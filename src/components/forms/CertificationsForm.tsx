import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GripVertical, Sparkles, Award, Calendar, ExternalLink } from "lucide-react";

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  description?: string;
  neverExpires: boolean;
}

interface CertificationsFormProps {
  data: CertificationItem[];
  onUpdate: (data: CertificationItem[]) => void;
  onAISuggestion?: (certificationId: string) => void;
}

function SortableCertificationItem({ 
  certification, 
  index, 
  onUpdate, 
  onDelete, 
  onAISuggestion 
}: {
  certification: CertificationItem;
  index: number;
  onUpdate: (index: number, data: CertificationItem) => void;
  onDelete: (index: number) => void;
  onAISuggestion?: (certificationId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: certification.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localData, setLocalData] = useState(certification);

  const handleFieldUpdate = (field: keyof CertificationItem, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(index, updated);
  };

  const isExpired = localData.expiryDate && !localData.neverExpires && 
    new Date(localData.expiryDate) < new Date();

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="group hover:shadow-md transition-all duration-200 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">
                    {localData.name || "Certification Name"}
                  </h4>
                  {localData.issuer && (
                    <p className="text-xs text-muted-foreground">{localData.issuer}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isExpired && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${certification.id}`}>Certification Name</Label>
              <Input
                id={`name-${certification.id}`}
                value={localData.name}
                onChange={(e) => handleFieldUpdate('name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization</Label>
              <Input
                id={`issuer-${certification.id}`}
                value={localData.issuer}
                onChange={(e) => handleFieldUpdate('issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor={`date-${certification.id}`}>
                <Calendar className="h-3 w-3 text-primary" />
                Issue Date
              </Label>
              <Input
                id={`date-${certification.id}`}
                type="month"
                value={localData.date}
                onChange={(e) => handleFieldUpdate('date', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`expiryDate-${certification.id}`}>Expiry Date</Label>
              <div className="space-y-2">
                <Input
                  id={`expiryDate-${certification.id}`}
                  type="month"
                  value={localData.expiryDate || ''}
                  onChange={(e) => handleFieldUpdate('expiryDate', e.target.value)}
                  disabled={localData.neverExpires}
                  placeholder="No expiry"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={localData.neverExpires}
                    onChange={(e) => {
                      handleFieldUpdate('neverExpires', e.target.checked);
                      if (e.target.checked) {
                        handleFieldUpdate('expiryDate', '');
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-muted-foreground">Never expires</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`credentialId-${certification.id}`}>Credential ID (Optional)</Label>
              <Input
                id={`credentialId-${certification.id}`}
                value={localData.credentialId || ''}
                onChange={(e) => handleFieldUpdate('credentialId', e.target.value)}
                placeholder="ABC-123-DEF"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor={`url-${certification.id}`}>
                <ExternalLink className="h-3 w-3 text-primary" />
                Credential URL (Optional)
              </Label>
              <Input
                id={`url-${certification.id}`}
                type="url"
                value={localData.url || ''}
                onChange={(e) => handleFieldUpdate('url', e.target.value)}
                placeholder="https://credly.com/badges/..."
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${certification.id}`}>Description (Optional)</Label>
            <Textarea
              id={`description-${certification.id}`}
              value={localData.description || ''}
              onChange={(e) => handleFieldUpdate('description', e.target.value)}
              placeholder="Brief description of skills and knowledge gained..."
              className="min-h-20 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-2">
            {localData.neverExpires && (
              <Badge variant="secondary" className="w-fit">
                No Expiry
              </Badge>
            )}
            {localData.credentialId && (
              <Badge variant="outline" className="w-fit text-xs">
                ID: {localData.credentialId}
              </Badge>
            )}
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAISuggestion?.(certification.id)}
            className="w-full hover:bg-primary/5"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Enhance Description
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function CertificationsForm({ data, onUpdate, onAISuggestion }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<CertificationItem[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = certifications.findIndex(item => item.id === active.id);
      const newIndex = certifications.findIndex(item => item.id === over.id);
      
      const newCertifications = arrayMove(certifications, oldIndex, newIndex);
      setCertifications(newCertifications);
      onUpdate(newCertifications);
    }
  };

  const handleAddCertification = () => {
    const newCertification: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
      description: '',
      neverExpires: false
    };
    
    const updated = [...certifications, newCertification];
    setCertifications(updated);
    onUpdate(updated);
  };

  const handleUpdateCertification = (index: number, updatedCert: CertificationItem) => {
    const updated = [...certifications];
    updated[index] = updatedCert;
    setCertifications(updated);
    onUpdate(updated);
  };

  const handleDeleteCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={certifications.map(cert => cert.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {certifications.map((certification, index) => (
              <SortableCertificationItem
                key={certification.id}
                certification={certification}
                index={index}
                onUpdate={handleUpdateCertification}
                onDelete={handleDeleteCertification}
                onAISuggestion={onAISuggestion}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button 
        variant="outline" 
        onClick={handleAddCertification}
        className="w-full border-dashed hover:bg-primary/5"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Certification
      </Button>

      {certifications.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Award className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No certifications added yet.</p>
          <p className="text-xs">Click the button above to add your certifications.</p>
        </div>
      )}
    </div>
  );
}