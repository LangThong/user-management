import { useState } from "react"

function UserForm ({editingUser, onSubmit, onCancel, users}){
    const [name, setName] = useState(editingUser?.name || "")
    const [email, setEmail] = useState(editingUser?.email || "")
    const [role, setRole] = useState(editingUser?.role || "")
    const [error, setError] = useState("")
    const roleSelect = ["Admin", "Editor","User"]

    const validate = () => {
        if(name.trim().length < 3) return "Tên Phải >=3 ký tự"
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const exists = users.some(
            u => u.email === email && u.id !== editingUser?.id
        )
        if(!email) return "Vui lòng nhập email"
        if(!emailRegex.test(email)) return "Email không hợp lệ"
        if(exists) return "Email đã tồn tại"
        
        if(!role) return "Vui lòng nhập vai trò"

        return ""
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const err = validate()
        if(err){
            return setError(err)
        }

        onSubmit({name, email, role})

        setName("")
        setRole("")
        setEmail("")
        setError("")
    }

    return(
        <form>
            <input
                placeholder="Họ và Tên"
                value={name}
                onChange={(e) =>setName(e.target.value)}
            />
            <br></br>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            />
            <br></br>
            <select
                value={role}
                onChange={(e) =>setRole(e.target.value)}
            >
               <option value="">-----Chọn vai trò-----</option>
               {roleSelect.map(
                    r => (
                        <option key={r} value={r} >{r}</option>
                    )
                    
               )}
            </select>
            <br></br>
            {error && (<p>{error}</p>)}
            <button onClick={handleSubmit}>{editingUser ? "Cập nhật": "Lưu"}</button>

            {
                editingUser && (
                    <button type="button" onClick={onCancel}>Hủy</button>
                )
            }
        </form>
    )
}
export default UserForm