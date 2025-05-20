export interface GetUsersResponse {
  users: User[];
  count: number;
}

export interface User {
  userId: string;
  username: string;
  name: string;
  lastname: string;
  passportId: string;
  address: string;
  photo: string;
  email: string;
  whatsApp: string;
  roleName: string;
  typeId: number;
  userProfilePlantas: UserProfilePlanta[];
}

export interface UserProfilePlanta {
  userId: string;
  planta: string;
  nroPlanta: string;
}
