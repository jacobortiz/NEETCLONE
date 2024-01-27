// import React from 'react';

import { Navbar } from '@/app/components/nav';

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
    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl- mx-auto">
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
                    <img src='/hero.png' alt='Hero'/>
                </div>
            </div>
        </div>
    )
}