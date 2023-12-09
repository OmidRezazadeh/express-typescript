export interface RoleInterface{
    findByName(name: string): Promise<string>;
}