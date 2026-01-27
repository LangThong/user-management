import { useState } from "react"
import TaskForm from "./components/TaskForm"
import { addTask, ClearALlTasks, getAllTasks, RemoveTask, upDateTask } from "./storage/taskStorage"
import TaskList from "./components/TaskList"

function AppTask (){
    const [editingTask, setEditingTask] = useState(null)
    const [tasks, setTasks] = useState(() => getAllTasks())
    const [search, setSearch] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    
    const handleSubmit = (taskData) =>{
        if(editingTask){
            const updated = {...editingTask, ...taskData}
            upDateTask(updated)
            setTasks(getAllTasks())
            setEditingTask(null)
        }else{
            const newId = tasks.length ? tasks[tasks.length -1].id + 1 : 1
            const newTask = {id: newId,...taskData}
            addTask(newTask)
            setTasks(getAllTasks())
        }
    }
    const handleDelete = (id) =>{
        if(!confirm("Bạn có muốn xóa task này không?")) return
        RemoveTask(id)
        setTasks(getAllTasks())
    }
    const handleClearAll = () => {
        if(!confirm("Bạn có muốn xóa tất cả danh sách hay không?")) return
        ClearALlTasks()
        setTasks(getAllTasks())
    }
    const handleToggleStatus = (task) =>{
        const updated = {...task, status: task.status === "Chưa làm" ? "Đã làm" : "Chưa làm"}
        upDateTask(updated)
        setTasks(getAllTasks())
    }

    const filterTasks = tasks.filter(t => {
        const keyWord = search.toLowerCase()
        return t.title.toLowerCase().includes(keyWord)
    })
    const displayTask = [...filterTasks].sort((a, b) =>{
        if(!sortOrder) return 0
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    })
    return (
        <>
            <h2>Task-Management</h2>
            <TaskForm
                key={editingTask?.id || "new"}
                editingTask={editingTask}
                onSubmit={handleSubmit}
                onCancel={() => setEditingTask(null)}
                tasks={tasks}
             />
             <br></br>
             <input
                placeholder="Tìm kiếm theo tiêu đề"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
             <button onClick={() => setSortOrder("asc")}>A-Z</button>
             <button onClick={() => setSortOrder("desc")}>Z-A</button>
             <button onClick={handleClearAll}>Xóa tất cả</button>

            <TaskList
                onEdit = {setEditingTask}
                onDelete = {handleDelete}
                onToggleStatus={handleToggleStatus} 
                tasks = {displayTask}
            />
        </>
    )
}
export default AppTask