import { useState } from "react"

function UserForm({ editingUser, onSubmit, onCancel, users }) {
    const [name, setName] = useState(editingUser?.name || "")
    const [email, setEmail] = useState(editingUser?.email || "")
    const [role, setRole] = useState(editingUser?.role || "")
    const [error, setError] = useState("")

    const validate = () => {
        if (name.trim().length < 3){
            return "Tên phải ≥ 3 ký tự"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!email){
            return "Vui lòng nhập Email"
        }
        if (!emailRegex.test(email)){
            return "Email không hợp lệ"
        }
        const exists = users.some(
            u => u.email === email && u.id !== editingUser?.id
        )
        if (exists){
            return "Email đã tồn tại"
        }
        if (!role){
            return "Vui lòng chọn vai trò"
        }
        return ""
    }

    const handleSubmit = (e) => {
        e.preventDefault() // ngăn chặn reload trang
        const err = validate()
        if (err){
            return setError(err)
        }
        // dữ liệu hợp lệ
        onSubmit({ name, email, role })
        // reset form
        setName("")
        setEmail("")
        setRole("")
        setError("")
    }
    // Input trong React = value từ state + onChange cập nhật state
    // {error ? <p>{error}</p> : null} bằng  {error && <p>{error}</p> }
    return (
        <form>
            <input placeholder="Họ và tên" value={name} onChange={e => setName(e.target.value)} /> <br></br>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /> <br></br>
            <select value={role} onChange={e => setRole(e.target.value)}><br></br>
                <option value="">-- Chọn vai trò --</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>User</option>
            </select>
            {error ? <p>{error}</p> : null}

            <button onClick={handleSubmit}>Lưu</button>
            {editingUser ? (
                <button type="button" onClick={onCancel}>Hủy</button>): null
            }
        </form>
    )
}

export default UserForm
