import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../utils/validator";
import { actionRegister } from "../../api/auth.api";
import { createAlert } from "../../utils/createAlert";
import HomeIcon from "../../icons";


function Register() {

  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema)
  })
  const { isSubmitting, errors } = formState;
  // console.log(errors)

  const hdlSubmit = async (value) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await actionRegister(value);
      console.log(res);
      createAlert("success", res.data.message);
      reset()
    } catch (error) {
      console.log(error)
      createAlert("info", error.response?.data?.message)
    }
  }

  return (
    <div className='flex w-full justify-center bg-[#e8caa0] min-h-screen'>
      <div>
        {/* Card */}
        <div className='flex flex-col border w-64 p-4 m-6 rounded-md bg-[#E1AB5E]'>

          <h1 className=' flex font-bold text-center my-6 justify-center gap-3.5'>Sign up to MangaList <HomeIcon className="w-5" /></h1>

          {/* Form */}
          <form onSubmit={handleSubmit(hdlSubmit)} className="flex flex-col gap-3" >
            <div className='flex flex-col'>
              <input className='border w-full rounded-md bg-[#DAB98A]  p-1 px-4'
                placeholder="Email"
                {...register("email")}
                type="email"
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <div className='flex flex-col'>
              <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                placeholder="Username"
                {...register("username")}
                type="text"
              />
              {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
            </div>
            <div className='flex flex-col'>
              <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                placeholder="Password"
                {...register("password")}
                type="password"
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>
            <div className='flex flex-col'>
              <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                type="password"
              />
              {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
            </div>

            <div className='flex justify-center mt-4'>
              <button type="submit" disabled={isSubmitting} className='bg-white text-black rounded-md py-1 px-3
    hover:bg-gray-300 hover:scale-105 hover:cursor-pointer hover:duration-300'> {isSubmitting ? "Registering..." : "Sign Up"}</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register