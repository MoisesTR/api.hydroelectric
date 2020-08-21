export interface UserCreateDTO {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    createdBy: string;
}

export interface UserUpdateDto {
    userId: number;
    firstName: string;
    lastName: string;
    updatedBy: string;
}

export interface UserChangeStateDto {
    userId: number;
    enabled: boolean;
    updatedBy: string;
}
