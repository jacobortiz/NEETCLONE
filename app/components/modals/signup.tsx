import { auth_modal_state } from '@/app/atoms/auth_atom'
import { auth } from '@/app/firebase/firebase'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { useSetRecoilState } from 'recoil'

export function SignUp() {
    const set_auth_modal_state = useSetRecoilState(auth_modal_state)

    const handleClick = () => {
        set_auth_modal_state((prev) => ({...prev, type: 'login'}))
    }
    const [inputs, setInputs] = useState({email: '', displayName: ' ', password: ''})
    
    
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value }))
    }

    const router = useRouter()

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.password || !inputs.displayName) return alert('Please fill all fields.')
        try {
            const new_user = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!new_user) return;
            // change
            router.push('/')
        } catch(error: any) {
            alert(error.message)
        }
    };

    useEffect(() => {
        if (error) alert(error.message)
    }, [error])

    return (
        <form className='space-y-6 px-6 pp-4' onSubmit={handleRegister}>
            <h3 className='text-xl font-medium text-white'>
                Register to NeetClone
            </h3>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    Email
                </label>
                <input type="email" name="email" id="email" onChange={handleChangeInput}
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@neetclone.io"/>
            </div>
            <div>
                <label htmlFor="display-name" className="text-sm font-medium block mb-2 text-gray-300">
                    Display Name
                </label>
                <input type="display-name" name="display-name" id="display-name" onChange={handleChangeInput}
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Neet Clone"/>
            </div>
            <div>
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                    Password
                </label>
                <input type="password" name="password" id="password" onChange={handleChangeInput}
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="*****"/>
            </div>

            <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm
                px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
                { loading ? 'Registering...' : 'Register'}
            </button>
            <div className="text-sm font-medium text-gray-500">
                Already Registered?{" "}
                <Link href={'#'} className="text-blue-700 hover:underline" onClick={handleClick}>
                    Login
                </Link>
            </div>
        </form>
    )
}