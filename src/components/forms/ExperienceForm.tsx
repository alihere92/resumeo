import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GripVertical, Sparkles, Briefcase, Calendar } from "lucide-react";

const experienceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(50, "Please provide at least 50 characters of description"),
  achievements: z.array(z.string()).default([])
});

const experienceSchema = z.object({
  experiences: z.array(experienceItemSchema)
});

type ExperienceData = z.infer<typeof experienceSchema>;
type ExperienceItem = z.infer<typeof experienceItemSchema>;

interface ExperienceFormProps {
  data: ExperienceItem[];
  onUpdate: (data: ExperienceItem[]) => void;
  onAISuggestion?: (experienceId: string) => void;
}

function SortableExperienceItem({ 
  experience, 
  index, 
  onUpdate, 
  onDelete, 
  onAISuggestion 
}: {
  experience: ExperienceItem;
  index: number;
  onUpdate: (index: number, data: ExperienceItem) => void;
  onDelete: (index: number) => void;
  onAISuggestion?: (experienceId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localData, setLocalData] = useState(experience);

  const handleFieldUpdate = (field: keyof ExperienceItem, value: any) => {
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
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-medium text-sm">
                  {localData.title || "Job Title"} 
                  {localData.company && ` at ${localData.company}`}
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
              <Label htmlFor={`title-${experience.id}`}>Job Title</Label>
              <Input
                id={`title-${experience.id}`}
                value={localData.title}
                onChange={(e) => handleFieldUpdate('title', e.target.value)}
                placeholder="Senior Software Engineer"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`company-${experience.id}`}>Company</Label>
              <Input
                id={`company-${experience.id}`}
                value={localData.company}
                onChange={(e) => handleFieldUpdate('company', e.target.value)}
                placeholder="Tech Corp"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2" htmlFor={`startDate-${experience.id}`}>
                <Calendar className="h-3 w-3 text-primary" />
                Start Date
              </Label>
              <Input
                id={`startDate-${experience.id}`}
                type="month"
                value={localData.startDate}
                onChange={(e) => handleFieldUpdate('startDate', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
              <div className="space-y-2">
                <Input
                  id={`endDate-${experience.id}`}
                  type="month"
                  value={localData.endDate || ''}
                  onChange={(e) => handleFieldUpdate('endDate', e.target.value)}
                  disabled={localData.current}
                  placeholder="Present"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={localData.current}
                    onChange={(e) => {
                      handleFieldUpdate('current', e.target.checked);
                      if (e.target.checked) {
                        handleFieldUpdate('endDate', '');
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-muted-foreground">Currently working here</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`location-${experience.id}`}>Location (Optional)</Label>
            <Input
              id={`location-${experience.id}`}
              value={localData.location || ''}
              onChange={(e) => handleFieldUpdate('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${experience.id}`}>Description & Achievements</Label>
            <Textarea
              id={`description-${experience.id}`}
              value={localData.description}
              onChange={(e) => handleFieldUpdate('description', e.target.value)}
              placeholder="Describe your key responsibilities, achievements, and impact in this role..."
              className="min-h-32 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">
              {localData.description.length}/50 characters minimum
            </p>
          </div>

          {localData.current && (
            <Badge variant="secondary" className="w-fit">
              Current Position
            </Badge>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAISuggestion?.(experience.id)}
            className="w-full hover:bg-primary/5"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Suggestions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function ExperienceForm({ data, onUpdate, onAISuggestion }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = experiences.findIndex(item => item.id === active.id);
      const newIndex = experiences.findIndex(item => item.id === over.id);
      
      const newExperiences = arrayMove(experiences, oldIndex, newIndex);
      setExperiences(newExperiences);
      onUpdate(newExperiences);
    }
  };

  const handleAddExperience = () => {
    const newExperience: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    
    const updated = [...experiences, newExperience];
    setExperiences(updated);
    onUpdate(updated);
  };

  const handleUpdateExperience = (index: number, updatedExp: ExperienceItem) => {
    const updated = [...experiences];
    updated[index] = updatedExp;
    setExperiences(updated);
    onUpdate(updated);
  };

  const handleDeleteExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
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
          items={experiences.map(exp => exp.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <SortableExperienceItem
                key={experience.id}
                experience={experience}
                index={index}
                onUpdate={handleUpdateExperience}
                onDelete={handleDeleteExperience}
                onAISuggestion={onAISuggestion}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button 
        variant="outline" 
        onClick={handleAddExperience}
        className="w-full border-dashed hover:bg-primary/5"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Work Experience
      </Button>

      {experiences.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No work experience added yet.</p>
          <p className="text-xs">Click the button above to add your first position.</p>
        </div>
      )}
    </div>
  );
}