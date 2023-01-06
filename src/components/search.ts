import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { filtering } from '../logic/filter';
import { productsObj } from '../utilities/data';
import { saveView } from './littleBigButtons';
import { showFound, showNumbersBrandsCategories } from '../main-page/content';

const arr: Product[] = productsObj.products;
export let searchValue: string = localStorage.getItem('searchValue') || '';
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysPrice: string[] = JSON.parse(localStorage.getItem('keysPrice')!) || [];
let keysStock: string[] = JSON.parse(localStorage.getItem('keysStock')!) || [];
let sortOption: string = localStorage.getItem('sortOption') || '';

export function searchInput(search: HTMLInputElement): void {
  search.addEventListener('input', (): void => {
    keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
    keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
    keysPrice = JSON.parse(localStorage.getItem('keysPrice')!) || [];
    keysStock = JSON.parse(localStorage.getItem('keysStock')!) || [];
    sortOption = localStorage.getItem('sortOption') || '';

    const prefix: string = search.value;

    historyResolver(Location.search, prefix);

    searchValue = search.value;
    localStorage.setItem('searchValue', searchValue);

    filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

    saveView();
    showFound();
    showNumbersBrandsCategories();
  });
}

export function searchQueryString(search: HTMLInputElement, urlParams: URLSearchParams): void {
  let strSearch = '';
  if (urlParams.has('search')) {
    strSearch = `&search=${urlParams.getAll('search').join('')}`;
  } else {
    strSearch = '';
  }
  localStorage.setItem('locationStringSearch', strSearch);

  search.value = `${urlParams.getAll('search').join('')}`;
}
