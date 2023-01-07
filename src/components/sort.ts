/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-mutable-exports */
import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { productsObj } from '../utilities/data';
import { filtering } from '../logic/filter';
import { saveView } from './littleBigButtons';

const arr: Product[] = productsObj.products;
export let sortOption: string = localStorage.getItem('sortOption') || '';
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysPrice: string[] = JSON.parse(localStorage.getItem('keysPrice')!) || [];
let keysStock: string[] = JSON.parse(localStorage.getItem('keysStock')!) || [];
let searchValue: string = localStorage.getItem('searchValue') || '';

export function sortChange(sort: HTMLSelectElement): void {
  sort.addEventListener('change', (): void => {
    keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
    keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
    keysPrice = JSON.parse(localStorage.getItem('keysPrice')!) || [];
    keysStock = JSON.parse(localStorage.getItem('keysStock')!) || [];
    searchValue = localStorage.getItem('searchValue') || '';

    const prefix: string = sort.options[sort.selectedIndex].value;

    historyResolver(Location.sort, prefix);

    sortOption = sort.options[sort.selectedIndex].value;
    localStorage.setItem('sortOption', sortOption);

    filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

    saveView();
  });
}

export function sortQueryString(sort: HTMLSelectElement, urlParams: URLSearchParams): void {
  sort.value = `${urlParams.getAll('sort').join('')}` ? `${urlParams.getAll('sort').join('')}` : 'Options';
}
