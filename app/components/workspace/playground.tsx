import Split from 'react-split'
import { PreferenceNav } from '@/app/components/workspace/preference_nav'
import ReactCodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { EditorFootor } from '@/app/components/workspace/editor_footer'
import { Problem } from '@/app/utils/problem'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/app/firebase/firebase'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { problems } from '@/app/utils/problems'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export function Playground({
  problem,
  setSuccess,
  setSolved,
}: {
  problem: Problem
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setSolved: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [activeTestCaseID, setActiveTestCaseID] = useState<number>(0)
  const [userCode, setUserCode] = useState<string>(problem?.starterCode)
  const [user] = useAuthState(auth)

  const params = useParams()

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please Login to submit code', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      })
      return
    }

    try {
      const cb = new Function(`return ${userCode}`)()
      const success = problems[params.slug as string].handlerFunction(cb)

      if (success) {
        toast.success('Congrats, All tests passes!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        })
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000)

        const userRef = doc(firestore, 'users', user.uid)
        await updateDoc(userRef, {
          solvedProblems: arrayUnion(params.slug),
        })

        setSolved(true)
      }
    } catch (error: any) {
      if (
        error.message.startsWith(
          'Error: AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:'
        )
      ) {
        toast.error('One or more test cases failed!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        })
      } else {
        toast.error(error.message, {
          position: 'top-center',
          theme: 'dark',
        })
      }
    }
  }

  useEffect(() => {
    const code = localStorage.getItem(`code-${params.slug}`)
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode)
    } else {
      setUserCode(problem.starterCode)
    }
  })

  const onChange = (value: string) => {
    setUserCode(value)
    localStorage.setItem(`code-${params.slug}`, JSON.stringify(value))
  }

  return (
    <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
      <PreferenceNav />
      <Split
        className='h-[calc(100vh-94px)]'
        direction='vertical'
        sizes={[60, 40]}
        minSize={60}>
        <div className='w-full overflow-auto'>
          {/* TODO: add more language support */}
          <ReactCodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={onChange}
          />
        </div>

        <div className='w-full px-5 overflow-auto'>
          {/* testcase heading */}
          <div className='flex h-10 items-center space-x-6 '>
            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
              <div className='text-sm font-medium leading-5 text-white'>
                Testcases
              </div>
              <hr className='absolute bottom-0 h-0.5 w-full rounded border-none bg-white' />
            </div>
          </div>

          <div className='flex'>
            {problem?.examples.map((example, index) => (
              <div
                className='mr-2 items-start mt-2 text-white'
                key={example.id}
                onClick={() => setActiveTestCaseID(index)}>
                <div className='flex flex-wrap items-center gap-y-4'>
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 
                                        hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                        ${
                                          activeTestCaseID === index
                                            ? 'text-white'
                                            : 'text-gray-500'
                                        }`}>
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-white'>Input: </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
              {problem?.examples[activeTestCaseID].inputText}
            </div>

            <p className='text-sm font-medium mt-4 text-white'>Output: </p>
            <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
              {problem?.examples[activeTestCaseID].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFootor handleSubmit={handleSubmit} />
    </div>
  )
}
