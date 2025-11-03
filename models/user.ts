export interface UserData {
  userName: string
  name?: string
  email: string
  imageUrl?: string
}

export interface User extends UserData {
  id: number
}
