'use client'

import Split from 'react-split'
import { ProblemDescription } from "@/app/components/workspace/problem_description"
import { Playground } from './playground'
import { Problem } from '@/app/utils/problem'

export function Workspace() {
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription />
            <Playground />
        </Split>
    )
}
