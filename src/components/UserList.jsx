import UserItem from "./UserItem"

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) return <p>Không có người dùng</p>

  return (
    <ul>
      {users.map(u => (
        <UserItem
          key={u.id}
          user={u}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default UserList
