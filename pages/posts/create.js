import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts/create",
        data
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col items-center">
      CreatePost
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Post title"
          {...register("title", { required: true })}
        />
        <textarea
          rows="15"
          cols="50"
          className="resize-none"
          placeholder="Post content"
          {...register("content")}
        />
        <input type="submit" value="Submit Post" />
      </form>
    </div>
  );
}
