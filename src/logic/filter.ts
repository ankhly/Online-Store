import {
  Product,
  KeyCategory,
  KeyBrand,
  Accumulator,
} from '../types';
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

export let allNumbersCategories: number[] = JSON.parse(localStorage.getItem('allNumbersCategories')!) || [];
export let allNumbersBrands: number[] = JSON.parse(localStorage.getItem('allNumbersBrands')!) || [];

export function filtering(
  array: Product[],
  keysCategoriesFilter: string[],
  keysBrandsFilter: string[],
  search: string,
  sort: string,
  price: string[],
  stock: string[],
) : void {
  let filterArray: Product[] = [];
  filterArray = array.filter((item: Product) => keysCategoriesFilter.some((key: string) => item.category === key) || keysBrandsFilter.some((key: string) => item.brand.toLowerCase().replace(/\s/g, '') === key)).length === 0
    ? array
    : array.filter((item: Product) => keysCategoriesFilter.some((key: string) => item.category === key) || keysBrandsFilter.some((key: string) => item.brand.toLowerCase().replace(/\s/g, '') === key));

  let searchFilterArray: Product[] = [];
  searchFilterArray = filterArray.filter((item: Product) => item.title.toLowerCase().includes(`${search.toLowerCase()}`) || item.category.toLowerCase().includes(`${search.toLowerCase()}`) || item.brand.toLowerCase().includes(`${search.toLowerCase()}`));

  let searchFilterArrayPrice: Product[] = [];
  searchFilterArrayPrice = searchFilterArray.filter((item: Product) => item.price > Number(price[0]) && item.price <= Number(price[1]));

  let searchFilterArrayPriceStock: Product[] = [];
  searchFilterArrayPriceStock = searchFilterArrayPrice.filter((item: Product) => item.stock > Number(stock[0]) && item.stock <= Number(stock[1]));

  // found
  localStorage.setItem('found', `${searchFilterArrayPriceStock.length}`);
  // numbers Brands and Categories
  const arrCategories: string[] = [];
  const arrBrands: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    arrBrands.push(arr[i].brand);
    arrCategories.push(arr[i].category);
  }

  const searchFilterCategory: string[] = [];
  const searchFilterBrands: string[] = [];
  for (let i = 0; i < searchFilterArrayPriceStock.length; i++) {
    searchFilterCategory.push(searchFilterArrayPriceStock[i].category);
    searchFilterBrands.push(searchFilterArrayPriceStock[i].brand);
  }

  const newArrCategories = arrCategories.map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase()).sort();
  const newArrBrands = arrBrands.map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase()).sort();
  const newSearchFilterCategory = searchFilterCategory.map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase()).sort();
  const newSearchFilterBrands = searchFilterBrands.map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase()).sort();

  const objCategories = newArrCategories.reduce((acc: Accumulator, current: string) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});

  const objBrands = newArrBrands.reduce((acc: Accumulator, current: string) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});

  const objSearchFilterCategories = newSearchFilterCategory.reduce((acc: Accumulator, current: string) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});

  const objSearchFilterBrands = newSearchFilterBrands.reduce((acc: Accumulator, current: string) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});

  allNumbersCategories = Object.entries(objCategories).map((elemArray) => elemArray[1]);
  allNumbersBrands = Object.entries(objBrands).map((elemArray) => elemArray[1]);

  const currentNumbersCategories: number[] = Object.entries(objCategories).map((elemArray) => {
    for (let i = 0; i < Object.entries(objSearchFilterCategories).length; i++) {
      if (elemArray[0] === Object.entries(objSearchFilterCategories)[i][0]) {
        return Object.entries(objSearchFilterCategories)[i][1];
      }
    }
    return 0;
  });

  const currentNumbersBrands: number[] = Object.entries(objBrands).map((elemArray) => {
    for (let i = 0; i < Object.entries(objSearchFilterBrands).length; i++) {
      if (elemArray[0] === Object.entries(objSearchFilterBrands)[i][0]) {
        return Object.entries(objSearchFilterBrands)[i][1];
      }
    }
    return 0;
  });

  localStorage.setItem('allNumbersCategories', JSON.stringify(allNumbersCategories));
  localStorage.setItem('allNumbersBrands', JSON.stringify(allNumbersBrands));
  localStorage.setItem('currentNumbersCategories', JSON.stringify(currentNumbersCategories));
  localStorage.setItem('currentNumbersBrands', JSON.stringify(currentNumbersBrands));

  switch (sort) {
    case 'price-ASC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => a.price - b.price);
      break;
    case 'price-DESC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => b.price - a.price);
      break;
    case 'rating-ASC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => a.rating - b.rating);
      break;
    case 'rating-DESC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => b.rating - a.rating);
      break;
    case 'discount-ASC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => a.discountPercentage - b.discountPercentage);
      break;
    case 'discount-DESC': searchFilterArrayPriceStock.sort((a: Product, b: Product) => b.discountPercentage - a.discountPercentage);
      break;
    default:
      break;
  }

  if (searchFilterArrayPriceStock.length === 0) {
    showNoProducts();
  } else {
    showFiltered(searchFilterArrayPriceStock);

    const productCards = document.querySelectorAll('.buttons-item__details') as NodeListOf<HTMLElement>;
    productCardsDetails(searchFilterArrayPriceStock, productCards);

    // обнуление при перезагрузке
    localStorage.removeItem('countCart');
    localStorage.removeItem('arrCart');
    localStorage.removeItem('total');
    const addToCard = document.querySelectorAll('.buttons-item__add') as NodeListOf<HTMLElement>;
    addToCardClick(searchFilterArrayPriceStock, addToCard);

    const cartBtn = document.querySelector('.cart-header__icon') as HTMLElement;
    cartBtnClick(cartBtn);
  }
}
