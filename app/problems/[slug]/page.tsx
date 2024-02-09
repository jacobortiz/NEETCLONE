import { Topbar } from "@/app/components/topbar";
import { Workspace } from "@/app/components/workspace/workspace";
import { Problem } from "@/app/utils/problem";
import { problems } from "@/app/utils/problems";

export default async function Problems({ 
    params 
} : { 
    params: { slug: Problem }
}) {
    console.log( params.slug)

    // const data = await getData({ params: { slug: params.slug.id } })
    // console.log(data)

    return (
        <div>
            <Topbar problemPage={true} />
            <Workspace />
        </div>
    )
}

// fetch local data
// SSG
// getStaticPaths => creates dynamic routes to pregenerate

export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { slug: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => fetches the data !! no supported in app/
// export async function getStaticProps({ params } : { params: { slug : string }}) {
//     const { slug } = params
//     const problem = problems[slug]

//     if(!problem) {
//         return {
//             notFound: true
//         }
//     }

//     return {
//         props: {
//             problem
//         }
//     }
// }