import { Topbar } from "@/app/components/topbar";

export default function Problems({ params }: { params: { slug: string }}) {
    return (
        <div>
            <Topbar />
            problem: { params.slug }
        </div>
    )
}