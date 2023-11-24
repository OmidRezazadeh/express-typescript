export interface ConfirmationCodeInterface{
    create(data: any): Promise<any>;
    find(code:string,email:string): Promise<any>
}