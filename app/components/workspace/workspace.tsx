'use client'

import Split from 'react-split'
import { ProblemDescription } from '@/app/components/workspace/problem_description'
import { Playground } from '@/app/components/workspace/playground'
import ReactConfetti from 'react-confetti'
import useWindowSize from '@/app/hooks/useWindowSize'
import { useState } from 'react'

export function Workspace({ problem }: { problem: any }) {
  const { width, height } = useWindowSize()
  const [success, setSucess] = useState(false)
  const [solved, setSolved] = useState(false)

  return (
    <Split className='split' minSize={0}>
      <ProblemDescription problem={problem} _solved={solved} />
      <div className='bg-dark-fill-2'>
        <Playground
          problem={problem}
          setSuccess={setSucess}
          setSolved={setSolved}
        />
        {success && (
          <ReactConfetti
            gravity={0.3}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  )
}
