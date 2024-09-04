"use client";
import React, { useState } from "react";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Une erreur inattendue est survenue");
          }
          console.log(error);
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Sumbit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
