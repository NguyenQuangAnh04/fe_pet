export interface userRegister {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface userLogin {
  userName: string;
  password: string;
}
export interface userDTO {
  id: number;
  email: string;
  phoneNumber: string;
  userName: string;
  password: string;
  confirmPassword: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  roleName: string;
  role: Role;
}

export interface UpdateUserParams {
  id: number;
  userUpdateRole: userUpdateRole;
}

export interface userUpdateRole {
  role: {
    id: number;
  };
}


export interface Role {
  id: number;
  name: string;
}