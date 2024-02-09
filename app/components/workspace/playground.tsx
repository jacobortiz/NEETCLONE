import Split from "react-split";
import { PreferenceNav } from '@/app/components/workspace/preference_nav'
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { EditorFootor } from "@/app/components/workspace/editor_footer";

export function Playground() {
    const boiler_plate = `function twoSum(nums, target) {
    // Write your code here
}`

    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
            <PreferenceNav />
            <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60,40]} minSize={60}>
                <div className="w-full overflow-auto">

                    {/* TODO: add more language support */}
                    <ReactCodeMirror 
                        value={boiler_plate}
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{ fontSize: 16}}
                    />
                </div>
                <div className="w-full px-5 overflow-auto">
                    {/* testcase heading */}
                    <div className="flex h-10 items-center space-x-6 ">
                        <div className="relative flex h-full flex-col justify-center cursor-pointer">
                            <div className="text-sm font-medium leading-5 text-white">Testcases</div>
                            <hr className="absolute bottom-0 h-0.5 w-full rounded border-none bg-white" />
                        </div>
                    </div>

                    <div className="flex">
                        {/* case 1 */}
                        <div className="mr-2 items-center mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 
                                    hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 1
                                </div>
                            </div>
                        </div>

                        {/* case 2 */}
                        <div className="mr-2 items-center mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 
                                    hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 2
                                </div>
                            </div>
                        </div>


                        {/* case 3 */}
                        <div className="mr-2 items-center mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 
                                    hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 3
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-semibold my-4">
                        <p className="text-sm font-medium mt-4 text-white">Input: </p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            nums: [2, 6, 5, 7], target: 9
                        </div>

                        <p className="text-sm font-medium mt-4 text-white">Output: </p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            [0, 3]
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFootor />
        </div>
    )
}

// 2:55:35