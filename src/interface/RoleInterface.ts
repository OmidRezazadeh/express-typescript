export interface RoleInterface{
    findByName(name: string): Promise<string>;
    store(data: any): Promise<any>;
}