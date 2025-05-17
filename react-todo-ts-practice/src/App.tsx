import { useState, useEffect } from "react"
import TodoItem from "./components/TodoItem";

interface Todo {
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {

    const stored = localStorage.getItem("todos")
    if (stored) {
      try {
        const parsed: Todo[] = JSON.parse(stored)
        return stored ? JSON.parse(stored) : []
      }
      catch (e) {
        return []
      }
    }
  }) // 렌더링 후 한번 실행
  const [input, setInput] = useState<string>("")


  // 앱이 처음 로드될 때 localStorage에서 todos 불러오기
  // useEffect(() => {
  //   const stored = localStorage.getItem("todos")
  //   if (stored) {
  //     try {
  //       const parsed: Todo[] = JSON.parse(stored)
  //       setTodos(parsed)
  //     }
  //     catch (e) {
  //       console.log("로컬스토리지 파싱 에러: ", e);

  //     }
  //   }
  // }, []) 렌더링 후 한번 실행

  // todos가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (input.trim() === "") return
    // setTodos([...todos, input])
    setTodos([...todos, { text: input, done: false }])
    setInput("")
  }

  const handleDelete = (deleteIdx: number) => {
    setTodos(todos.filter((_, idx) => idx !== deleteIdx))
  }

  const toggleDone = (targetIdx: number) => {
    setTodos(
      todos.map((todo, idx) =>
        idx === targetIdx ? { ...todo, done: !todo.done } : todo)
    )
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">📝 할 일 목록</h1>


      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          autoFocus
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          추가
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          // props 객체를 생성해서 넘기지 않고, todo, onToggle, onDelete 각각을 개별 prop으로 직접 넘김 (JSX에선 이 방식이 표준)
          <TodoItem
            key={idx} // key는 React 내부에서만 쓰이며, 컴포넌트 props로는 전달되지 않음. 리스트 항목 식별용.
            todo={todo}
            onToggle={() => toggleDone(idx)}
            onDelete={() => handleDelete(idx)}
          // onDelete={handleDelete(idx)} // 즉시 실행이라 불가
          />))}
      </ul>
    </div>
  );
}
export default App