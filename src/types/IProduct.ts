export interface IProduct {
    id: number  | null;
    name: string | null;
    description: string | null;
    price: number | null;
    stockQuantity:number | null;
    categoryId:number | null;
    subcategory_id:number | null;
    is_wishlist:boolean | null;
    image_url:string | null;
    subCategoryId:number | null;
  }
   
