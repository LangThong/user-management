const STORAGE_KEY = "ListUser"

export function getAllUsers(){
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

export function addUser(user){
    const listUser = getAllUsers()
    listUser.push(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listUser))
}

export function updateUser(updateUser){
    const listUser = getAllUsers().map(
        list => list.id === updateUser.id ? updateUser : list
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listUser))
}

export  function removeUser(id){
    const listUser = getAllUsers().filter(
        list => list.id !== id
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listUser))
}

export function clearUsers(){
    localStorage.removeItem(STORAGE_KEY)
}