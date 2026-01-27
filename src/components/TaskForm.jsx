import { useState } from "react"

function TaskForm ({editingTask, onSubmit, onCancel, tasks}){
    const [title, setTitle] = useState(editingTask?.title || "")
    const [description, setDescription] = useState(editingTask?.description || "")
    const [assignee, setAssignee] = useState(editingTask?.assignee || "")
    const [status , setStatus] = useState(editingTask?.status || "")
    const selectAssignees = ["Thuận","Đạt","Nhân","Uyên"]
    const selectStatus = ["Chưa làm", "Đã làm"]
    const [error, setError] = useState("")

    const validate = () =>{
        const isTitleDuplicate = tasks.some(
            t => t.title === title && t.id !== editingTask?.id
        )
        if(isTitleDuplicate) return "Tiêu đề công việc đã tồn tại"
        if(!title.trim()) return "Vui lòng nhập tiêu đề"
        if(!description.trim()) return "Vui lòng nhập mô tả"
        if(!assignee) return "Vui lòng chọn nhân viên"
        if(!status) return "Vui lòng chọn trạng thái"

        return ""
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const err = validate()
        if(err){
            return setError(err)
        }
        onSubmit({title, description, assignee, status})

        if(!editingTask){
            setTitle("")
            setDescription("")
            setAssignee("")
            setStatus("Chưa làm")
            setError("")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Tiêu đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <input 
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br/>
            <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
            >
                <option value="">-----Chọn nhân viên-----</option>
                {selectAssignees.map(staff =>(
                    <option value={staff} key={staff}>{staff}</option>
                ))}
            </select>
            <br/>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">-----Chọn trạng thái-----</option>
                {selectStatus.map(s =>(
                    <option value={s} key={s}>{s}</option>
                ))}
            </select>
            <br/>
            {error && (<p>{error}</p>)}
            <br/>
            <button type="submit">{editingTask ? "Cập nhật" : "Thêm"}</button>
            {editingTask && (<button type="button" onClick={onCancel}>Hủy</button>)}
        </form>
    )
}
export default TaskForm