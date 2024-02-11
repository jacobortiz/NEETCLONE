import { auth_modal_state } from "@/app/atoms/auth_atom";
import { auth } from "@/app/firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

export function Login() {
  const set_auth_modal_state = useSetRecoilState(auth_modal_state);
  const handleClick = (type: "register" | "login" | "forgotPassword") => {
    set_auth_modal_state((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return alert("Please fill all fields");
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);

  return (
    <form className='space-y-6 px-6 pp-4' onSubmit={handleLogin}>
      <h3 className='text-xl font-medium text-white'>Sign in to NeetClone</h3>
      <div>
        <label
          htmlFor='email'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          onChange={handleInputChange}
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='email@company.com'
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='text-sm font-medium block mb-2 text-gray-300'
        >
          Your Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleInputChange}
          className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
          placeholder='*****'
        />
      </div>

      <button
        type='submit'
        className='w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm
                px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'
      >
        {loading ? "Loading" : "Login"}
      </button>
      <button
        className='felx w-full justify-end'
        onClick={() => handleClick("forgotPassword")}
      >
        <Link
          href={"#"}
          className='text-sm block text-brand-orange hover:underline w-full text-right'
        >
          Forgot Password?
        </Link>
      </button>
      <div className='text-sm font-medium text-gray-500'>
        Not Registered?{" "}
        <Link
          href={"#"}
          className='text-blue-700 hover:underline'
          onClick={() => handleClick("register")}
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}
