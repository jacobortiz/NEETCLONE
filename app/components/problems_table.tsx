'use client'
import { problems } from '@/app/problems/mock_problems'
import { BsCheckCircle } from 'react-icons/bs'

import Link from 'next/link'
import { AiFillYoutube } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import { useEffect, useState } from 'react'

export function ProblemsTable() {

    const [youtube_player, setYoutubePlayer] = useState({
        isOpen: false,
        video_id: ''
    })

    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, video_id: '' })
    }

    useEffect(() => {
        const handle_esc = (e: KeyboardEvent) => {
            if(e.key === 'Escape') closeModal()
        };
        window.addEventListener('keydown', handle_esc);
        return () => window.removeEventListener('keydown', handle_esc)
    }, [])

    return (
        <>
            <tbody className="text-white">
                {problems.map((doc, idx) => {
                    const difficuly_color = 
                    doc.difficulty === 'Easy' ? 'text-dark-green-s' : doc.difficulty === 'Medium' ? 'text-dark-yellow' : 'text-dark-pink' 
                    return (
                        <tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ' '}`} key={doc.id}>
                            <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                <BsCheckCircle fontSize={'18'} width={'18'}/>
                            </th>
                            <td className='px-6 py-4'>
                                <Link href={`/problems/${doc.id}`} className='hover:text-blue-600 cursor-pointer '>
                                    {doc.title}
                                </Link>
                            </td>
                            <td className={`px-6 py-4 ${difficuly_color}`}>
                                {doc.difficulty}
                            </td>
                            <td className={`px-6 py-4`}>
                                {doc.category}
                            </td>
                            <td className={`px-6 py-4`}>
                                {doc.video_id ? (
                                    <AiFillYoutube 
                                    fontSize={'18'}
                                    className='cursor-pointer hover:text-red-600'
                                    onClick={() => setYoutubePlayer({ isOpen: true, video_id: doc.video_id as string })}/>
                                    ) : (
                                        <p className='text-gray-400'>
                                        Coming Soon
                                    </p>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            {youtube_player.isOpen && (
                <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                <div className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"></div>
                <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex  items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose fontSize={'35'} className='cursor-pointer absolute -top-16 right-0' onClick={closeModal}/>
                            <YouTube videoId={youtube_player.video_id} loading='lazy' iframeClassName='w-full min-h-[500px]' />
                        </div>
                    </div>
                </div>
                </tfoot>
            )}
        </>
    )
}