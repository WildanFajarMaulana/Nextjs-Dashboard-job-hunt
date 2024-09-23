"use client";

import { jobFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FieldInput from "@/components/organisms/FieldInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { JOBTYPES } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputSkills from "@/components/organisms/InputSkills";
import CKEditor from "@/components/organisms/CKEditor";
import InputBenefits from "@/components/organisms/InputBenefits";
import { Button } from "@/components/ui/button";
import TitleForm from "@/components/atoms/TitleForm";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { CategoryJob } from "@prisma/client";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface PostJobPageProps {}

const PostJobPage: FC<PostJobPageProps> = ({}) => {
  const { data, error, isLoading } = useSWR<CategoryJob[]>(
    "/api/job/categories",
    fetcher
  );
  const { data: session } = useSession();
  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      requiredSkills: [],
      benefits: [],
    },
  });

  const onSubmit = async (val: z.infer<typeof jobFormSchema>) => {
    try {
      const body: any = {
        applicants: 0,
        benefits: JSON.stringify(val.benefits),
        categoryId: val.categoryId,
        companyId: session?.user.id!!,
        datePosted: moment().toDate(),
        description: val.jobDescription,
        dueDate: moment().add(1, "M").toDate(),
        jobType: val.jobType,
        needs: 20,
        niceToHaves: val.niceToHaves,
        requiredSkills: val.requiredSkills,
        responsibility: val.responsibility,
        roles: val.roles,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        whoYouAre: val.whoYouAre,
      };

      const response = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create job");
      }

      await router.push("/job-listings");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Please try again",
      });
      console.log("Error details:", error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <ArrowLeftIcon className="w-7 h-7" />
        <span className="text-2xl font-semibold">Post</span>
      </div>

      <div className="my-5">
        <TitleForm
          title="Basic Information"
          subTitle="List out your top perks and benefits."
        />
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          <FieldInput
            title="Job Title"
            subTitle="Job titles must be describe one position"
          >
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="e.g. Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>At least 80 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Type of Employment"
            subTitle="You can select multiple type of employment"
          >
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-4"
                    >
                      {JOBTYPES.map((item: string, i: number) => (
                        <FormItem
                          key={item + i}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Salary"
            subTitle="Please specify the estimated salary range for the role."
          >
            <div className="w-[450px] flex flex-row justify-between items-center">
              <FormField
                control={form.control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="$100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-center">To</span>
              <FormField
                control={form.control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="$1000"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldInput>
          <FieldInput
            title="Categories"
            subTitle="You can select job categories"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[450px]">
                        <SelectValue placeholder="Select a categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldInput>
          <FieldInput
            title="Required Skills"
            subTitle="Add required skills for the job"
          >
            <InputSkills form={form} label="Add Skills" name="requiredSkills" />
          </FieldInput>
          <FieldInput
            title="Job Descriptions"
            subTitle="Job titles must be describe one position"
          >
            <CKEditor
              form={form}
              name="jobDescription"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Responsibilities"
            subTitle="Outline the core responsibilities of the position"
          >
            <CKEditor
              form={form}
              name="responsibility"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Who You Are"
            subTitle="Add your preferred candidates qualifications"
          >
            <CKEditor
              form={form}
              name="whoYouAre"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Nice-To-Haves"
            subTitle="Add nice-to-have skills and qualification for the role to encourage a more diverse set of candidates to apply"
          >
            <CKEditor
              form={form}
              name="niceToHaves"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <FieldInput
            title="Perks and Benefits"
            subTitle="Encourage more people to apply by sharing the attractive rewards and benetifs you offer your employees"
          >
            <InputBenefits form={form} />
          </FieldInput>
          <div className="flex justify-end">
            <Button size="lg">Do a Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostJobPage;
