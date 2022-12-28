import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { filtering } from '../logic/filter';
import { productsObj } from '../utilities/data';
import { saveView } from './littleBigButtons';
import { sortOption } from './sort';

// search
const arr: Product[] = productsObj.products;
export let searchValue: string = localStorage.getItem('searchValue') || '';
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];

export function searchInput(search: HTMLInputElement): void {
  search.addEventListener('input', (): void => {
    keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
    keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
    const prefix: string = search.value;

    historyResolver(Location.search, prefix);

    // search
    searchValue = search.value;
    localStorage.setItem('searchValue', searchValue);

    filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption);

    // чтобы сохранялся вид
    saveView();
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
