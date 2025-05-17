interface Todo {
    text: string
    done: boolean
}

interface Props {
    todo: Todo // todo: { text: string; done: boolean } 형태의 할 일 데이터
    onToggle: () => void
    onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <li className="flex items-center gap-2" >
            <input
                type="checkbox"
                checked={todo.done}
                onChange={onToggle}
                className="w-4 h-4"
            />
            <span
                className={`flex-1 ${todo.done ? "line-through text-gray-400" : ""
                    }`}
            >
                {todo.text}
            </span>
            <button
                onClick={onDelete}
                className="text-red-500 hover:underline"
            >
                삭제
            </button>
        </li >
    )
}