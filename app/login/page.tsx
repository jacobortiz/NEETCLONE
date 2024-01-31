// import React from 'react';
'use client'

import { Navbar } from '@/app/components/nav';
import { AuthModal } from '@/app/components/modals/auth';
import { useRecoilValue } from 'recoil';
import { auth_modal_state } from '../atoms/auth_atom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const auth_modal = useRecoilValue(auth_modal_state)
    const [user, loading, error] = useAuthState(auth)
    const [pageLoading, setPageloading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        if(user) router.push('/')
        if(!loading && !user) setPageloading(false);
    }, [user, router, loading])

    if(pageLoading) return null;

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl- mx-auto">
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
                    <img src='/hero.png' alt='Hero'/>
                </div>
                {auth_modal.isOpen && <AuthModal />}
            </div>
        </div>
    )
}