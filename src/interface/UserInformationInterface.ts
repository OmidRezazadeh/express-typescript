export interface UserInformationInterface{
    create(data: any, session:any): Promise<any>;
}