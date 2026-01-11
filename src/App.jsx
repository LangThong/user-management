import { useState } from "react"
import {
  getAllUsers,
  addUser,
  updateUser,
  removeUser,
  clearUsers
} from "./storage/userStorage"

import UserForm from "./components/UserForm"
import SearchBar from "./components/SearchBar"
import UserList from "./components/UserList"

function App() {
  const [users, setUsers] = useState(() => getAllUsers()) //Chỉ đọc storage 1 lần khi load app
  const [search, setSearch] = useState("")
  const [editingUser, setEditingUser] = useState(null)

  const handleSubmit = (data) => {
    if (editingUser) {
      const updated = { ...editingUser, ...data }
      updateUser(updated)
      setUsers(prev =>
        prev.map(u => (u.id === updated.id ? updated : u))
      )
      setEditingUser(null) // thoát chế độ edit
    } else {
      const newUser = { id: Date.now(), ...data }
      addUser(newUser)
      setUsers(prev => [...prev, newUser]) // ạo mảng mới gồm tất cả người dùng cũ + người dùng mới ở cuối.
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm("Xóa user này?")) return
    removeUser(id)
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const handleClearAll = () => {
    if (!window.confirm("Xóa tất cả user?")) return
    clearUsers()
    setUsers([])
  }

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const sortAZ = () => {
    setUsers(prev =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name))
    )
  }

  const sortZA = () => {
    setUsers(prev =>
      [...prev].sort((a, b) => b.name.localeCompare(a.name))
    )
  }

  return (
    <>
      <h1>User Management</h1>

      <UserForm
        key={editingUser?.id || "new"}
        editingUser={editingUser}
        users={users}
        onSubmit={handleSubmit}
        onCancel={() => setEditingUser(null)}
      />

      <SearchBar
        search={search}
        onSearch={setSearch}
      />

      <button onClick={sortAZ}>Sort A–Z</button>
      <button onClick={sortZA}>Sort Z–A</button>
      <button onClick={handleClearAll}>Xóa tất cả</button>

      <UserList
        users={filteredUsers}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />
    </>
  )
}

export default App
