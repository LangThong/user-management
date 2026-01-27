const Storage_Key = "listTask"

export function getAllTasks(){
    const data = localStorage.getItem(Storage_Key)
    return data ? JSON.parse(data) : []
}
export function addTask (task){
    const listTask = getAllTasks()
    listTask.push(task)
    localStorage.setItem(Storage_Key, JSON.stringify(listTask))
}
export function upDateTask(task){
    const listTask = getAllTasks().map(
        l => l.id === task.id ? task : l
    )
    localStorage.setItem(Storage_Key, JSON.stringify(listTask))
}
export function RemoveTask(id){
    const listTask = getAllTasks().filter(
        l => l.id !== id
    )
    localStorage.setItem(Storage_Key, JSON.stringify(listTask))
}
export function ClearALlTasks(){
    localStorage.removeItem(Storage_Key)
}
