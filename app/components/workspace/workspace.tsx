"use client";

import Split from "react-split";
import { ProblemDescription } from "@/app/components/workspace/problem_description";
import { Playground } from "@/app/components/workspace/playground";

export function Workspace({ problem }: { problem: any }) {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <Playground problem={problem} />
    </Split>
  );
}
