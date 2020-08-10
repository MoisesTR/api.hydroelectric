export interface RolCreateDto {
    rolName: string;
    rolDescription: string;
    createdBy: string;
}

export interface RolUpdateDto {
    rolId: number;
    rolName: string;
    rolDescription: string;
    updatedBy: string;
}
