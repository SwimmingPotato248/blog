import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    if (!session) return signIn("/posts/create");
    console.log(data);
    try {
      const res = await axios.post(
        `${window.location.origin}/api/posts/create`,
        data
      );
      window.location = "/";
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title key="title">Create post</title>
      </Head>
      <div className="flex flex-col items-center">
        <form
          className="flex flex-col gap-2 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Post title"
            {...register("title", { required: true })}
          />
          {errors.title && <p>Title is required</p>}
          <textarea
            rows="15"
            cols="50"
            className="resize-none"
            placeholder="Post content"
            {...register("content")}
          />
          <input
            type="submit"
            value="Submit Post"
            className="rounded bg-blue-500 hover:bg-blue-700 border-black border-2"
          />
        </form>
      </div>
    </>
  );
}
