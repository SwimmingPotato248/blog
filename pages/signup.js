import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await axios.post("/api/signup", data);
      signIn(undefined, { callbackUrl: "/" });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      className="flex flex-col mx-auto w-96 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      <input
        type="text"
        placeholder="Display name"
        {...register("name", { required: "Display name is required" })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password must be longer than 5 characters",
          },
        })}
      />
      {errors && errors.password?.message}
      <input
        type="submit"
        value="Sign Up"
        className="bg-blue-500 hover:bg-blue-700 rounded py-2"
      />
    </form>
  );
}
