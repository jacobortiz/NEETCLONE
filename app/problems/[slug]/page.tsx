import { Topbar } from "@/app/components/topbar";
import { Workspace } from "@/app/components/workspace/workspace";
import { Problem } from "@/app/utils/problem";
import { problems } from "@/app/utils/problems";

export default async function Problems({ 
    params 
} : { 
    params: { slug: string } // TODO: Change 'string' to 'Problem', 
}) {
    const data = await getData({ params: { slug: params.slug } })
    return (
        <div>
            <Topbar problemPage={true} />
            <Workspace problem={data.props?.problem}/>
        </div>
    )
}

export async function generateStaticParams() {
    const paths = Object.keys(problems).map((key) => ({
        params : { slug: key }
    }));

    return [
        paths,
    ]
}

export async function getData({ params } : { params: { slug : string }}) {
    const { slug } = params
    const problem = problems[slug]

    if(!problem) {
        return {
            notFound: true
        }
    }
    
    problem.handlerFunction = problem.handlerFunction.toString()
    return {
        props: {
            problem
        }
    }
}