export interface RoleInterface{
    findById(roleId: string): Promise<string>;
    findByName(name: string): Promise<string>;
    store(data: any): Promise<any>;
    list(data: any, reqData:any): Promise<any>;
}