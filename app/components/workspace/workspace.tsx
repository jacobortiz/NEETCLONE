'use client'

import Split from 'react-split'
import { ProblemDescription } from "@/app/components/workspace/problem_description"
import { Playground } from './playground'

export function Workspace() {
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription />
            <Playground />
        </Split>
    )
}
