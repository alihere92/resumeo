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
import { Plus, Trash2, GripVertical, Sparkles, GraduationCap, Calendar } from "lucide-react";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
  description?: string;
  current: boolean;
}

interface EducationFormProps {
  data: EducationItem[];
  onUpdate: (data: EducationItem[]) => void;
  onAISuggestion?: (educationId: string) => void;
}

function SortableEducationItem({ 
  education, 
  index, 
  onUpdate, 
  onDelete, 
  onAISuggestion 
}: {
  education: EducationItem;
  index: number;
  onUpdate: (index: number, data: EducationItem) => void;
  onDelete: (index: number) => void;
  onAISuggestion?: (educationId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: education.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localData, setLocalData] = useState(education);

  const handleFieldUpdate = (field: keyof EducationItem, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(index, updated);
  };

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
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium text-sm">
                  {localData.degree || "Degree"} 
                  {localData.institution && ` at ${localData.institution}`}
                </h4>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`degree-${education.id}`}>Degree</Label>
              <Input
                id={`degree-${education.id}`}
                value={localData.degree}
                onChange={(e) => handleFieldUpdate('degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`institution-${education.id}`}>Institution</Label>
              <Input
                id={`institution-${education.id}`}
                value={localData.institution}
                onChange={(e) => handleFieldUpdate('institution', e.target.value)}
                placeholder="Stanford University"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor={`graduationDate-${education.id}`}>
                <Calendar className="h-3 w-3 text-primary" />
                Graduation Date
              </Label>
              <div className="space-y-2">
                <Input
                  id={`graduationDate-${education.id}`}
                  type="month"
                  value={localData.graduationDate}
                  onChange={(e) => handleFieldUpdate('graduationDate', e.target.value)}
                  disabled={localData.current}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={localData.current}
                    onChange={(e) => {
                      handleFieldUpdate('current', e.target.checked);
                      if (e.target.checked) {
                        handleFieldUpdate('graduationDate', '');
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-muted-foreground">Currently studying</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
              <Input
                id={`gpa-${education.id}`}
                value={localData.gpa || ''}
                onChange={(e) => handleFieldUpdate('gpa', e.target.value)}
                placeholder="3.8/4.0"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${education.id}`}>Location (Optional)</Label>
            <Input
              id={`location-${education.id}`}
              value={localData.location || ''}
              onChange={(e) => handleFieldUpdate('location', e.target.value)}
              placeholder="Stanford, CA"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${education.id}`}>Additional Information (Optional)</Label>
            <Textarea
              id={`description-${education.id}`}
              value={localData.description || ''}
              onChange={(e) => handleFieldUpdate('description', e.target.value)}
              placeholder="Relevant coursework, honors, activities..."
              className="min-h-20 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {localData.current && (
            <Badge variant="secondary" className="w-fit">
              Currently Studying
            </Badge>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAISuggestion?.(education.id)}
            className="w-full hover:bg-primary/5"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Optimize Description
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function EducationForm({ data, onUpdate, onAISuggestion }: EducationFormProps) {
  const [education, setEducation] = useState<EducationItem[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = education.findIndex(item => item.id === active.id);
      const newIndex = education.findIndex(item => item.id === over.id);
      
      const newEducation = arrayMove(education, oldIndex, newIndex);
      setEducation(newEducation);
      onUpdate(newEducation);
    }
  };

  const handleAddEducation = () => {
    const newEducation: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      description: '',
      current: false
    };
    
    const updated = [...education, newEducation];
    setEducation(updated);
    onUpdate(updated);
  };

  const handleUpdateEducation = (index: number, updatedEdu: EducationItem) => {
    const updated = [...education];
    updated[index] = updatedEdu;
    setEducation(updated);
    onUpdate(updated);
  };

  const handleDeleteEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
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
          items={education.map(edu => edu.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {education.map((educationItem, index) => (
              <SortableEducationItem
                key={educationItem.id}
                education={educationItem}
                index={index}
                onUpdate={handleUpdateEducation}
                onDelete={handleDeleteEducation}
                onAISuggestion={onAISuggestion}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button 
        variant="outline" 
        onClick={handleAddEducation}
        className="w-full border-dashed hover:bg-primary/5"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>

      {education.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <GraduationCap className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No education added yet.</p>
          <p className="text-xs">Click the button above to add your education.</p>
        </div>
      )}
    </div>
  );
}