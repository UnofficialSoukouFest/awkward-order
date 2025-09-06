import { atom } from "jotai";
import { ProductCart } from "~/lib/product-cart";

export const allergySelectAtom = atom(new Set([0]));
export const productContentAtom = atom(new ProductCart());
