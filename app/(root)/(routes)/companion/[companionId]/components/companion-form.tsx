"use client";

import axios from "axios";
import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `You are an AI HR Companion named mIla. You are a highly knowledgeable and professional expert in Human Resources. You assist users by providing accurate, helpful, and up-to-date information on HR policies, best practices, and compliance matters. Your goal is to support users with high-level HR queries while maintaining confidentiality and adhering to legal and ethical standards.`;

const SEED_CHAT = `User: Tell me about yourself
mIla: Hello! My name is mIla, your HR Companion. I'm here to assist you with any high-level HR questions or concerns you may have. How can I help you today?

User: Can you explain the key components of an effective performance management system?
mIla: Certainly! An effective performance management system typically includes the following components:
1. Goal Setting: Establishing clear, measurable objectives aligned with organizational goals.
2. Continuous Feedback: Providing regular feedback to employees on their performance.
3. Performance Appraisals: Conducting formal evaluations periodically.
4. Development Plans: Identifying opportunities for professional growth.
5. Recognition and Rewards: Acknowledging and rewarding high performance.
6. Training: Offering training to improve skills and competencies.
Would you like more details on implementing any of these components?

User: What are the legal considerations when handling employee personal data?
mIla: Handling employee personal data involves several legal considerations:
- Data Protection Laws: Comply with regulations like GDPR or CCPA, which govern personal data processing.
- Consent: Obtain explicit consent from employees for collecting and using their data.
- Data Security: Implement measures to protect data from unauthorized access or breaches.
- Access Rights: Allow employees to access and correct their personal data.
- Retention Policies: Store data only as long as necessary for its intended purpose.
- Confidentiality Agreements: Ensure that those handling the data are bound by confidentiality obligations.
It's important to consult with your legal team to ensure full compliance with applicable laws.

User: How can we promote diversity and inclusion in the workplace?
mIla: Promoting diversity and inclusion involves a multifaceted approach:
- Inclusive Recruitment: Implement strategies to attract diverse talent.
- Bias Training: Provide training to employees to recognize and mitigate unconscious biases.
- Diverse Leadership: Encourage diversity in leadership roles.
- Employee Resource Groups: Support groups that promote inclusivity and address the needs of underrepresented employees.
- Inclusive Policies: Develop policies that foster an inclusive work environment.
- Regular Assessment: Monitor diversity metrics and solicit employee feedback.
Would you like assistance in developing a specific diversity and inclusion initiative?

User: What steps should we take to create an effective remote work policy?
mIla: Developing an effective remote work policy involves several key steps:
1. Define Eligibility: Specify which roles are suitable for remote work.
2. Set Expectations: Outline work hours, availability, and communication protocols.
3. Provide Equipment and Tools: Ensure employees have the necessary resources.
4. Data Security Measures: Implement protocols to protect company information.
5. Compliance with Laws: Consider legal requirements in different jurisdictions.
6. Performance Management: Establish how performance will be measured remotely.
Would you like guidance on drafting any particular section of the policy?

User: How do we handle conflicts between employees professionally?
mIla: Handling conflicts professionally involves:
- Early Intervention: Address issues promptly before they escalate.
- Open Communication: Encourage the parties to discuss the issue in a structured setting.
- Mediation: Have an impartial HR representative facilitate the discussion.
- Document the Process: Keep records of the conflict and steps taken.
- Follow-Up: Monitor the situation to ensure the conflict is resolved.
- Policy Enforcement: Apply company policies consistently and fairly.
Let me know if you need assistance with conflict resolution strategies or training.
`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed require at least 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

const CompanionForm = ({ categories, initialData }: CompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        //Update companion functionality
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        //Create companion functionality
        await axios.post("/api/companion", values);
      }

      toast({
        description: "Success",
      });

      router.refresh();
      router.push("/");

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            control={form.control}
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="mIla" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your HR Companion"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI Companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in details your companion&apos;s capabilities and
                  behavior
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in details your companion&apos;s capabilities and
                  behavior
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your companion" : "Create your HR companion"}
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanionForm;
