'use client'

import Image from 'next/image'
import { Topbar } from '@/app/components/topbar'
import { ProblemsTable } from '@/app/components/problems_table'
import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/app/firebase/firebase'

export default function Home() {

  const [inputs, setInputs] =  useState({
    id: '',
    title: '',
    difficulty: '',
    category: '',
    videoId: '',
    link: '',
    order: 0,
    likes: 0,
    dislikes: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const newProblem = {
      ...inputs,
      order: Number(inputs.order)
    }
    
    console.log(inputs)

    await setDoc(doc(firestore, "problems", inputs.id), newProblem)
    alert('saved to db')
  }

  return (
    <>
    <main className='bg-dark-layer-2 min-h-screen'>
      <Topbar problemPage={false} />
      <h1 className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5'>
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👀 🤫
      </h1>
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>

        <table className='text-sm text-center text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
            <tr>
              <th scope='col' className='px-1 py-3 w-0 font-medium'>
                Status
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Title
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Difficulty
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Category
              </th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>
                Solution
              </th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>

      {/* temp form */}
      <form className='p-6 flex flex-col max-w-sm gap-3' onSubmit={handleSubmit}>
        <input onChange={handleInputChange}type="text" placeholder='problemId' name='id' />
        <input onChange={handleInputChange}type="text" placeholder='title' name='title' />
        <input onChange={handleInputChange}type="text" placeholder='difficulty' name='difficulty' />
        <input onChange={handleInputChange}type="text" placeholder='category' name='category' />
        <input onChange={handleInputChange}type="text" placeholder='order' name='order' />
        <input onChange={handleInputChange}type="text" placeholder='videoId?' name='videoId' />
        <input onChange={handleInputChange}type="text" placeholder='link?' name='link' />
        <button className='bg-white'>save to db</button>
      </form>
    </main>
    </>
  )
}