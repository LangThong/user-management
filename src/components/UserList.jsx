
function UserList({onEdit, onDelete, users}){
    return(
        <>
            <h3>Danh sách người dùng</h3>

            {users.length === 0 && (<p>Chưa có người dùng nào</p>)}

            {users.map(u => (
                <div key={u.id}>
                    {u.name} | {u.email} | {u.role}
                    <button onClick={() => onEdit(u)}>Sửa</button>
                    <button onClick={() => onDelete(u.id)}>Xóa</button>
                </div>
            ))}
        </>
    )
}
export default UserList