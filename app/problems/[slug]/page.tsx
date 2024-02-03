import { Topbar } from "@/app/components/topbar";

export default function Problems({ params }: { params: { slug: string }}) {
    return (
        <div>
            <Topbar problemPage={true} />
            problem: { params.slug }
        </div>
    )
}