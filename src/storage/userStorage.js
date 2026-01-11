export const STORAGE_KEY = "users"

export function getAllUsers(){
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

export function addUser(user){
    const users = getAllUsers()
    users.push(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function updateUser(updateUser){
    const users = getAllUsers().map(
        u => u.id === updateUser.id ? updateUser : u
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    
}

export function removeUser(id){
    const users = getAllUsers().filter(u => u.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function clearUsers(){
    localStorage.removeItem(STORAGE_KEY)
}