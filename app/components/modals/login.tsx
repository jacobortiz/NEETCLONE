import { auth_modal_state } from "@/app/atoms/auth_atom"
import Link from "next/link"
import { useSetRecoilState } from "recoil"

export function Login() {
    const set_auth_modal_state = useSetRecoilState(auth_modal_state)
    const handleClick = (type: "register" | "login" | "forgotPassword") => {
        set_auth_modal_state((prev) => ({...prev, type}))
    }

    return (
        <form className='space-y-6 px-6 pp-4'>
            <h3 className='text-xl font-medium text-white'>
                Sign in to NeetClone
            </h3>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    Your Email
                </label>
                <input type="email" name="email" id="email"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="email@company.com"/>
            </div>

            <div>
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                    Your Password
                </label>
                <input type="password" name="password" id="password"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="*****"/>
            </div>

            <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm
                px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
                Login
            </button>
            <button className="felx w-full justify-end" onClick={() => handleClick('forgotPassword')}>
                <Link href={'/'} className="text-sm block text-brand-orange hover:underline w-full text-right">
                    Forgot Password?
                </Link>
            </button>
            <div className="text-sm font-medium text-gray-500">
                Not Registered?{" "}
                <Link href={'#'} className="text-blue-700 hover:underline" onClick={() => handleClick('register')}>
                    Create Account
                </Link>
            </div>
        </form>
    )
}