'use client';

import { motion, LayoutGroup } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { auth_modal_state } from '../atoms/auth_atom';

// const navItems = {
//   '/': {
//     name: 'home',
//   },
//   '/problems': {
//     name: 'problem list',
//   },
//   '/login': {
//     name: 'login',
//   },
// };

export function Navbar() {

  const set_auth_modal_state = useSetRecoilState(auth_modal_state)

  const handleClick = () => { 
    set_auth_modal_state((prev) => ({...prev, isOpen: true}));
  }
  return (
    // <aside className="-ml-[8px] mb-16 tracking-tight">
    //   <div className="lg:sticky lg:top-20">
    //     <LayoutGroup>
    //       <nav
    //         className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
    //         id="nav"
    //       >
    //         <div className="flex flex-row space-x-0 pr-10">
    //           <Suspense fallback={null}>
    //             {Object.entries(navItems).map(([path, { name }]) => {
    //               return <NavItem key={path} path={path} name={name} />;
    //             })}
    //           </Suspense>
    //         </div>
    //       </nav>
    //     </LayoutGroup>
    //   </div>
    // </aside>
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
      <Link href={'/'} className='flex items-center justify-center h-20'>
        <img src='/logo.png'alt='Neetclone Leetclone' className='h-full'/>
      </Link>
      <div className='flex items-center'>
        <button className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
          hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 
          border-transparent transition duration-300 ease-in-out' onClick={handleClick}>
          Sign In
        </button>
      </div>
    </div>
  );
}

// let cx = (...classes: any[]) => classes.filter(Boolean).join(' ');

// function NavItem({ path, name }: { path: string; name: string }) {
//   let pathname = usePathname() || '/';
//   if (pathname.includes('/blog/')) {
//     pathname = '/blog';
//   }
//   let isActive = path === pathname;

//   return (
//     <Link
//       key={path}
//       href={path}
//       className={cx(
//         'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
//         {
//           'text-neutral-500': !isActive,
//         }
//       )}
//     >
//       <span className="relative py-1 px-2">
//         {name}
//         {path === pathname ? (
//           <motion.div
//             className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
//             layoutId="sidebar"
//             transition={{
//               type: 'spring',
//               stiffness: 350,
//               damping: 30,
//             }}
//           />
//         ) : null}
//       </span>
//     </Link>
//   );
// }