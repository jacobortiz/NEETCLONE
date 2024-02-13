'use client'

import { BsCheckCircle } from 'react-icons/bs'

import Link from 'next/link'
import { AiFillYoutube } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import React, { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { auth, firestore } from '@/app/firebase/firebase'
import { DBProblem } from '@/app/utils/problem'
import { useAuthState } from 'react-firebase-hooks/auth'

export function ProblemsTable({
  setLoadingProblems,
}: {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const problems = useGetProblems(setLoadingProblems)

  const [youtube_player, setYoutubePlayer] = useState({
    isOpen: false,
    video_id: '',
  })

  const solvedProblems = useGetSolvedProblems()

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, video_id: '' })
  }

  useEffect(() => {
    const handle_esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handle_esc)
    return () => window.removeEventListener('keydown', handle_esc)
  }, [])

  return (
    <>
      <tbody className='text-white'>
        {problems.map((problem, idx) => {
          const difficuly_color =
            problem.difficulty === 'Easy'
              ? 'text-dark-green-s'
              : problem.difficulty === 'Medium'
              ? 'text-dark-yellow'
              : 'text-dark-pink'
          return (
            <tr
              className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ' '}`}
              key={problem.id}>
              <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                {solvedProblems.includes(problem.id) && (
                  <BsCheckCircle fontSize={'18'} width={'18'} />
                )}
              </th>
              <td className='px-6 py-4'>
                {problem.link ? (
                  <Link
                    href={problem.link}
                    className='hover:text-blue-600 cursor-pointer'
                    target='_blank'>
                    {problem.title}
                  </Link>
                ) : (
                  <Link
                    href={`/problems/${problem.id}`}
                    className='hover:text-blue-600 cursor-pointer'>
                    {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-6 py-4 ${difficuly_color}`}>
                {problem.difficulty}
              </td>
              <td className={`px-6 py-4`}>{problem.category}</td>
              <td className={`px-6 py-4`}>
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={'18'}
                    className='cursor-pointer hover:text-red-600'
                    onClick={() =>
                      setYoutubePlayer({
                        isOpen: true,
                        video_id: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className='text-gray-400'>Coming Soon</p>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
      {youtube_player.isOpen && (
        <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
          <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'></div>
          <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
            <div className='w-full h-full flex  items-center justify-center relative'>
              <div className='w-full relative'>
                <IoClose
                  fontSize={'35'}
                  className='cursor-pointer absolute -top-16 right-0'
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtube_player.video_id}
                  loading='lazy'
                  iframeClassName='w-full min-h-[500px]'
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  )
}

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([])

  useEffect(() => {
    const getProblems = async () => {
      // fetching data logic
      setLoadingProblems(true)

      const q = query(
        collection(firestore, 'problems'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)

      const temp = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as DBProblem)
      )
      setProblems(temp)
      setLoadingProblems(false)
    }

    getProblems()
  }, [])

  return problems
}

function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([])
  const [user] = useAuthState(auth)
  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, 'users', user!.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems)
      }
    }
    if (user) getSolvedProblems()
    else setSolvedProblems([])
  }, [user])
  return solvedProblems
}
