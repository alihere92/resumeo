import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sparkles, Globe, Mail, Phone, MapPin } from "lucide-react";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  website: z.string().url().optional().or(z.literal(""))
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onUpdate: (data: PersonalInfoData) => void;
  onAISuggestion?: () => void;
}

export function PersonalInfoForm({ data, onUpdate, onAISuggestion }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
    mode: "onChange"
  });

  const watchedValues = form.watch();

  // Update parent component when form values change
  React.useEffect(() => {
    if (form.formState.isValid) {
      onUpdate(watchedValues);
    }
  }, [watchedValues, form.formState.isValid, onUpdate]);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Globe className="h-3 w-3 text-primary" />
                    </div>
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John" 
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Doe" 
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Mail className="h-3 w-3 text-primary" />
                  </div>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="john.doe@example.com" 
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <Phone className="h-3 w-3 text-primary" />
                    </div>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+1 (555) 123-4567" 
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      <MapPin className="h-3 w-3 text-primary" />
                    </div>
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="San Francisco, CA" 
                      {...field}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Globe className="h-3 w-3 text-primary" />
                  </div>
                  Website/Portfolio
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://johndoe.dev" 
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="pt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAISuggestion}
          className="w-full hover:bg-primary/5 transition-colors"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Optimize Contact Information
        </Button>
      </div>
    </div>
  );
}