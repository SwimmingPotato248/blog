import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const router = useRouter();

  async function onSubmit(data) {
    try {
      const res = await axios.post("/api/signin", data);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/4 min-w-{300px} gap-3 "
      >
        <input type="email" {...register("email")} placeholder="Email" />
        {errors.email?.message && <p>{errors.email?.message}</p>}

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
