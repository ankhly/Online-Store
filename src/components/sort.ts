import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { productsObj } from '../utilities/data';
import { filtering } from '../logic/filter';
import { saveView } from './littleBigButtons';
import { searchValue } from './search';

// sort
const arr: Product[] = productsObj.products;
export let sortOption: string = localStorage.getItem('sortOption') || '';
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];

export function sortChange(sort: HTMLSelectElement): void {
  sort.addEventListener('change', (): void => {
    keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
    keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
    const prefix: string = sort.options[sort.selectedIndex].value;

    historyResolver(Location.sort, prefix);

    // sort
    sortOption = sort.options[sort.selectedIndex].value;
    localStorage.setItem('sortOption', sortOption);

    filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption);

    // чтобы сохранялся вид
    saveView();
  });
}

export function sortQueryString(sort: HTMLSelectElement, urlParams: URLSearchParams): void {
  sort.value = `${urlParams.getAll('sort').join('')}` ? `${urlParams.getAll('sort').join('')}` : 'Options';
}
