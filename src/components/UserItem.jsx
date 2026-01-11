function UserItem({ user, onEdit, onDelete }) {
  return (
    <li>
      {user.name} | {user.role} | {user.email}
      <button onClick={() => onEdit(user)}>Sửa</button>
      <button onClick={() => onDelete(user.id)}>Xóa</button>
    </li>
  )
}

export default UserItem
