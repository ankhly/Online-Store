import { Product, KeyCategory, KeyBrand } from '../types';
import { productsObj } from '../utilities/data';
import { showFiltered, showNoProducts } from '../main-page/content';
import { productCardsDetails } from '../details/details';
import { addToCardClick, cartBtnClick } from '../cart/cart';

const arr: Product[] = productsObj.products;

export let keysCategories: KeyCategory[] = JSON.parse(localStorage.getItem('keysCategories')!) || [];
export let keysBrands: KeyBrand[] = JSON.parse(localStorage.getItem('keysBrands')!) || [];

let arr1: KeyCategory[] = [];
let arr2: KeyBrand[] = [];

export function getKeys(): void {
  arr1 = [];
  arr2 = [];

  keysCategories = JSON.parse(localStorage.getItem('keysCategories')!) || arr1;
  keysBrands = JSON.parse(localStorage.getItem('keysBrands')!) || arr2;

  for (let i = 0; i < arr.length; i++) {
    const keyCategory: KeyCategory = {
      category: `${arr[i].category.toLowerCase().replace(/\s/g, '')}`,
      selected: false,
      flag: false,
    };

    const keysBrand: KeyBrand = {
      brand: `${arr[i].brand.toLowerCase().replace(/\s/g, '')}`,
      selected: false,
      flag: false,
    };

    arr1.push(keyCategory);
    arr2.push(keysBrand);
  }

  arr1.sort((a: KeyCategory, b: KeyCategory) => (a.category > b.category ? 1 : -1));
  arr2.sort((a: KeyBrand, b: KeyBrand) => (a.brand > b.brand ? 1 : -1));
}
// Получаем keys
getKeys();

export function filtering(
  array: Product[],
  keysCategoriesFilter: string[],
  keysBrandsFilter: string[],
  search: string,
  sort: string,
) : void {
  let filterArray: Product[] = [];

  filterArray = array.filter((item: Product) => keysCategoriesFilter.some((key: string) => item.category === key) || keysBrandsFilter.some((key: string) => item.brand.toLowerCase().replace(/\s/g, '') === key)).length === 0
    ? array
    : array.filter((item: Product) => keysCategoriesFilter.some((key: string) => item.category === key) || keysBrandsFilter.some((key: string) => item.brand.toLowerCase().replace(/\s/g, '') === key));
  let searchFilterArray: Product[] = [];

  searchFilterArray = filterArray.filter((item: Product) => item.title.toLowerCase().includes(`${search.toLowerCase()}`) || item.category.toLowerCase().includes(`${search.toLowerCase()}`) || item.brand.toLowerCase().includes(`${search.toLowerCase()}`));

  switch (sort) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    case '': searchFilterArray;
      break;
    case 'price-ASC': searchFilterArray.sort((a: Product, b: Product) => a.price - b.price);
      break;
    case 'price-DESC': searchFilterArray.sort((a: Product, b: Product) => b.price - a.price);
      break;
    case 'rating-ASC': searchFilterArray.sort((a: Product, b: Product) => a.rating - b.rating);
      break;
    case 'rating-DESC': searchFilterArray.sort((a: Product, b: Product) => b.rating - a.rating);
      break;
    case 'discount-ASC': searchFilterArray.sort((a: Product, b: Product) => a.discountPercentage - b.discountPercentage);
      break;
    case 'discount-DESC': searchFilterArray.sort((a: Product, b: Product) => b.discountPercentage - a.discountPercentage);
      break;
    default:
      break;
  }

  if (searchFilterArray.length === 0) {
    showNoProducts();
  } else {
    showFiltered(searchFilterArray);

    const productCards = document.querySelectorAll('.buttons-item__details') as NodeListOf<HTMLElement>;
    productCardsDetails(searchFilterArray, productCards);

    const addToCard = document.querySelectorAll('.buttons-item__add') as NodeListOf<HTMLElement>;
    addToCardClick(searchFilterArray, addToCard);

    const cartBtn = document.querySelector('.cart-header__icon') as HTMLElement;
    cartBtnClick(cartBtn);
  }
}
