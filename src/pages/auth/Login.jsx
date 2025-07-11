import HomeIcon from '../../icons'
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validator';
import { createAlert } from '../../utils/createAlert';


function Login() {
const navigate = useNavigate();
  const actionLoginWithZustand = useAuthStore((state) => state.actionLoginWithZustand);

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlSubmit = async (value) => {
    const res = await actionLoginWithZustand(value);
    if (res.success) {
      createAlert("success", "Welcome to MangaList");
      if (res.role === "USER") {
        navigate("/users");
      } else {
        navigate("/");
      }
    } else {
      createAlert("info", res.message);
    }
  };

  return (
        <div className='flex w-full h-full justify-center bg-[#e8caa0] min-h-screen'>
          <div>
          {/* Card */}
          <div className='flex flex-col border w-64 p-4 m-6 rounded-md bg-[#E1AB5E]'>

            <h1 className='flex font-bold text-center my-6 justify-center gap-3.5'>Login <HomeIcon className="w-5"/></h1>

            {/* Form */}
            <form onSubmit={handleSubmit(hdlSubmit)} className="flex flex-col gap-3">
              <div className='flex flex-col'>
                <input className='border w-full rounded-md bg-[#DAB98A]  p-1 px-4'
                  placeholder="Email"
                   {...register("email")}
                  type="email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
              </div>
              <div className='flex flex-col '>
                <input className='border w-full rounded-md bg-[#DAB98A] p-1 px-4'
                  placeholder="Password"
                   {...register("password")}
                  type="password"
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
              </div>

              <div className='flex justify-center mt-4'>
                <button type="submit" disabled={isSubmitting} className='bg-white text-black rounded-md
    hover:bg-gray-300 hover:scale-105 hover:cursor-pointer hover:duration-300 px-5 py-1'>{isSubmitting ? "Login..." : "Login"}</button>

              </div>
            </form>
          </div>
          </div>
        </div>
      )
    }
export default Login