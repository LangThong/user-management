import { useState } from "react"
import { addUser, clearUsers, getAllUsers, removeUser, updateUser } from "./storage/userStorage"
import UserForm from "./components/UserForm"
import UserList from "./components/UserList"

function App(){
    const [editingUser, setEditingUser] = useState(null)
    const [users, setUsers] = useState(() => getAllUsers())
    const [search, setSearch] = useState("")
    const [sortOrder, setSortOrder] = useState("")

    const handleSubmit = (userData) =>{
        if(editingUser){
            const updated = {...editingUser, ...userData}
            updateUser(updated)
            setUsers(getAllUsers())

            setEditingUser(null)
        }else{
            const newId = users.length ? users[users.length - 1].id + 1 : 1
            const newUser = {id: newId, ...userData}
            addUser(newUser)
            setUsers(getAllUsers())
        }
    }
   
    const handleDelete = (id) => {
        if(confirm("Bạn có muốn xóa người dùng này không!!!")){
            removeUser(id)
            setUsers(getAllUsers())
        }
    }
    const handleClearALl = () =>{
        if(confirm("Xóa tất cả users ?")){
            clearUsers()
            setUsers([])
        }
    }
    
    const filteredUsers = users.filter(u => {
        const keyword = search.toLowerCase()
        return (
            u.name.toLowerCase().includes(keyword) ||
            u.email.toLowerCase().includes(keyword)
        )
    })
    console.log("MẢNG USER ĐÃ ĐƯỢC LỌC",filteredUsers)
    const displayUser = [...filteredUsers].sort((a, b) =>{
        if(!sortOrder) return 0 // giữ nguyên thứ tự hiện tại
        return sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
    })


    return (
        <> 
            <h2>User-Management</h2>
            <UserForm
                key = {editingUser?.id || "new"}
                editingUser = {editingUser}
                onSubmit = {handleSubmit}
                onCancel = { () => setEditingUser(null)}
                users = {users}
            />
            <br></br>
            <input
                placeholder="Search Name or Email"
                value={search}
                onChange={(e) =>setSearch(e.target.value)}
                style={{ marginRight: 8 }}
            />
            <button onClick={() => setSortOrder("asc")}>A–Z</button>
            <button onClick={() => setSortOrder("desc")}>Z–A</button>
            <button onClick={handleClearALl} style={{ marginLeft: 8 }}>Xóa tất cả</button>
            <UserList
                onEdit = {setEditingUser}
                onDelete = {handleDelete}
                users = {displayUser}
            />
        </>
    )
}
export default App