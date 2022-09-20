import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export default function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const res = await axios.post("/api/signup", data);
      if (res.status === 200) router.push("/");
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/4 min-w-{300px} gap-3 "
      >
        <input type="email" {...register("email")} placeholder="Email" />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <input type="text" {...register("name")} placeholder="Display name" />
        {errors.name?.message && <p>{errors.name?.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <input
          type="submit"
          className="border-black border-1 rounded bg-blue-500 hover:bg-blue-700 py-2"
          value="Register"
        />
      </form>
    </div>
  );
}
