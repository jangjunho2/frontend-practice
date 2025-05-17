interface PostsPageProps {
    params: {
        slug: string; // [slug] 폴더명에 따라 Next.js가 URL 경로에서 자동으로 params.slug를 생성해 전달함
    }
}
export default function PostPage({ params }: PostsPageProps) {
    return (
        <main>
            <h1 className="font-bold text-xl">글 상세</h1>
            <p>{params.slug}</p>
        </main>
    )
}