import { groq } from "next-sanity";

// Запрос для получения всех товаров
export const PRODUCTS_QUERY = groq`*[_type == "product"] {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  latinName,
  shortDesc,
  description,
  startPrice,
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

// Запрос товара по слагу (убедись, что он у тебя есть, я его приводил выше)
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

// Новый запрос: Берем 2 товара, у которых slug НЕ совпадает с текущим
export const RELATED_PRODUCTS_QUERY = groq`*[_type == "product" && slug.current != $slug][0...2] {
  _id,
  "id": _id,
  name,
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
