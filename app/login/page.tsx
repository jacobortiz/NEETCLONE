// import React from 'react';
'use client'

import { Navbar } from '@/app/components/nav';
import { AuthModal } from '@/app/components/modals/auth';
import { useRecoilValue } from 'recoil';
import { auth_modal_state } from '../atoms/auth_atom';

// import { Navbar } from "../components/nav";

// interface PageProps {
//     // Add any props you need for your page here
// }

// const Page: React.FC<PageProps> = () => {
//     return (
//         <div>
//             testing login
//         </div>
//     );
// };

// export default Page;

export default function Page() {
    const auth_modal = useRecoilValue(auth_modal_state)
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