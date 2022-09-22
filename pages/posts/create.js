import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    if (!session) return console.log("Sign in first");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts/create",
        data
      );
      window.location = "/";
    } catch (e) {
      console.log(e);
    }
  }

  return (
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
  );
}
