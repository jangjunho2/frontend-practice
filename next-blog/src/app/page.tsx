// import { useEffect, useState } from "react"; // CSR

// mock data (실제로는 fetch해서 backend로부터 정보를 가져와야함)
const dummyPosts = [

  { title: "첫 글", slug: 'post-1' },
  { title: "두번째 글", slug: 'post-2' },
  { title: "세번째 글", slug: 'post-3' }
]

export default async function Home() {

  // const [message, setMessage] = useState<string>("")
  // // CSR 방식으로  "use client" 선언 필요 , 이 프로젝트에선 SSR로 구현
  // useEffect(() => {
  //   fetch('http://localhost:8080/hello')
  //     .then((res) => res.json()) // fetch() 함수가 만든 promise의 결과값 res
  //     .then((data) => setMessage(data.message)) // res.json() 함수가 만든 promise의 결과값 data
  //     .catch((e) => console.log("API 요청 실패:", e)
  //     )
  // }, [])

  // SSR 방식으로 구현 async(비동기) 추가
  const res = await fetch('http://localhost:8080/hello-api?name=junho', { cache: 'no-store' }) // 요청마다 실행
  const data = await res.json();



  // JSX는 return()안에 반드시 하나의 최상위 태그만 있어야함.
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">미니 블로그</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li className="w-45" key={post.slug}>
            <a className="block bg-blue-500 hover:bg-blue-600 rounded px-10 hover:underline w-full text-center mb-1"
              href={`/post/${post.slug}`}>
              {post.title}

            </a>
          </li>
        ))}
      </ul>
      <div>
        <h1>API 호출 연습</h1>
        API 응답 이름: {data.name}
      </div>
    </main >);

}