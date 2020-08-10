export interface UserCreateDTO {
    userName: string;
    firstName: string;
    lastName: string;
    createdBy: string;
}

export interface UserUpdateDto {
    userId: number;
    firstName: string;
    lastName: string;
    updatedBy: string;
}
