import { useState,useEffect } from "react"

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")


  // 앱이 처음 로드될 때 localStorage에서 todos 불러오기
  useEffect(()=>{
    const stored = localStorage.getItem("todos")
    if (stored){
      setTodos(JSON.parse(stored))
    }
  },[])

  // todos가 바뀔 때마다 localStorage에 저장
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  const handleAdd = () => {
    if (input.trim() === "") return
    // setTodos([...todos, input])
    setTodos([...todos,{text:input,done:false}])
    setInput("")
  }

  const handleDelete= (deleteIdx) =>{
    setTodos(todos.filter((_,idx)=>idx!==deleteIdx))
  }

const toggleDone= (targetIdx)=>{
  setTodos(
    todos.map((todo,idx)=>
    idx===targetIdx?{...todo, done:!todo.done}:todo)
  )
}


  return (
    <div style={{ padding: "2rem" }}>
      <h1>📝 할 일 목록</h1>

      <form 
      onSubmit={(e)=>{
        e.preventDefault(); // 새로고침 방지
        handleAdd();
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          autoFocus
        />
        <button type="submit">추가</button>
      </form>

      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            <input 
            type="checkbox"
            checked={todo.done}
            onChange={()=>toggleDone(idx)}
            />
          <span style={{textDecoration:todo.done ? "line-through" : "none",
            color: todo.done ? "#999" : "#000"
          }}>
            {todo.text}
            </span>
                    <button onClick={()=>handleDelete(idx) }style={{marginLeft: "1rem"}}>삭제</button> 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App