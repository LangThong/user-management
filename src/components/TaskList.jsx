
function TaskList({onEdit, onDelete, onToggleStatus, tasks}){
    if(!tasks.length){
        return <p>Chưa có công việc nào</p>
    }
    return (
        <ul>
            {tasks.map(task =>(
                <li key={task.id}>
                    {task.title} | {task.assignee} | {task.status}

                    <button onClick={() =>onToggleStatus(task)}>Đổi trạng thái</button>
                    <button onClick={() =>onEdit(task)}>Sửa</button>
                    <button onClick={() =>onDelete(task.id)}>Xóa</button>
                </li>
            ))}
        </ul>
    )
}
export default TaskList