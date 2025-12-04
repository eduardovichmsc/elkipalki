import { groq } from "next-sanity";

// Запрос списка всех категорий
export const CATEGORIES_QUERY = groq`*[_type == "category"]|order(title asc) {
  _id,
  title,
  "slug": slug.current
}`;

// Запрос товаров (добавляем category->)
export const PRODUCTS_QUERY = groq`*[_type == "product"] {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  latinName,
  shortDesc,
  startPrice,
  "images": {
    "main": mainImage.asset->url,
    "hover": hoverImage.asset->url
  },
  
  // Раскрываем категорию, чтобы фильтровать на фронте
  "category": category->{
    title,
    "slug": slug.current
  },
  
  tags
}`;

// Запрос товара по слагу
export const PRODUCT_BY_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  "id": _id,
  name,
  latinName,
  description,
  shortDesc,
  "images": {
    "main": mainImage.asset->url,
    "hover": hoverImage.asset->url
  },
  specs,
  sizes[] {
    "id": _key,
    height,
    price,
    available
  },
  tags
}`;

// Берем 2 товара, у которых slug НЕ совпадает с текущим
export const RELATED_PRODUCTS_QUERY = groq`*[_type == "product" && slug.current != $slug][0...2] {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  latinName,
  startPrice,
  shortDesc,
  "images": {
    "main": mainImage.asset->url,
    "hover": hoverImage.asset->url
  },
  specs,
  sizes[] {
    "id": _key,
    height,
    price,
    available
  },
  tags
}`;
