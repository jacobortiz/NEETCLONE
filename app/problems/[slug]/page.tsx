import { Topbar } from "@/app/components/topbar";
import { Workspace } from "@/app/components/workspace/workspace";

export default function Problems({ params }: { params: { slug: string }}) {
    return (
        <div>
            <Topbar problemPage={true} />
            {/* problem: { params.slug } */}
            <Workspace />
        </div>
    )
}