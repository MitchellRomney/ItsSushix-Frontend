export interface UserType {
  id: Number | null,
  name: String | null
  isSuperuser: Boolean
}

export interface ProfileType {
  user: UserType | null
}