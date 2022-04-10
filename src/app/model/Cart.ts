import { ProductModel } from "./Product";

export interface CartModel{
    product : ProductModel,
    amount : number,
    _id : number,
}