import { DynamoDB } from "aws-sdk";
interface UpdateItemParams {
    TableName: string;
    Key: {
        [key: string]: string;
    };
    UpdateExpression: string;
    ExpressionAttributeValues: {
        [key: string]: string | number | undefined | null;
    };
    ReturnValues?: string;
}
interface GetItemParams {
    TableName: string;
    Key: {
        [key: string]: string;
    };
}
interface DeleteItemParams {
    TableName: string;
    Key: {
        [key: string]: string;
    };
    ReturnValues?: string;
}
interface ScanItemsParams {
    TableName: string;
    FilterExpression?: string;
    ExpressionAttributeNames?: {
        [key: string]: string;
    };
    ExpressionAttributeValues?: {
        [key: string]: string | number | undefined | null;
    };
}
export declare const updateItem: (params: UpdateItemParams) => Promise<DynamoDB.DocumentClient.UpdateItemOutput>;
export declare const buildExpression: (body: any) => string;
export declare const buildAttributes: (body: any) => {
    [x: string]: string | number;
    [x: number]: string | number;
};
export declare const getItem: (params: GetItemParams) => Promise<DynamoDB.DocumentClient.GetItemOutput>;
export declare const scanItems: (params: ScanItemsParams) => Promise<DynamoDB.DocumentClient.ScanOutput>;
export declare const deleteItem: (params: DeleteItemParams) => Promise<DynamoDB.DocumentClient.DeleteItemOutput>;
export {};
