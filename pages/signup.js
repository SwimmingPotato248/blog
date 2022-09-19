import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email", { required: true })} />
        </div>
        <div>
          <label htmlFor="name">Display name</label>
          <input type="text" {...register("name", { required: true })} />
        </div>
      </form>
    </>
  );
}
