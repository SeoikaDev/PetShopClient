import { ProductModel } from "./Product";

export interface FavoriteModel{
  product : ProductModel,
  _id : string,
  date : string,
  status : string,
}