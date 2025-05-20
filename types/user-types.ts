export type GetUserTypesResponse = UserType[]

export interface UserType {
  id: number
  name: string
  active: boolean
}