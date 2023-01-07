/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-mutable-exports */
import {
  historyResolver, locationBrandsFlagFalse, locationBrandsFlagTrue,
} from '../routing/routing';
import { KeyBrand, Location, Product } from '../types';
import { filtering, keysBrands } from '../logic/filter';
import { productsObj } from '../utilities/data';
import { saveView } from './littleBigButtons';
import { showFound, showNumbersBrandsCategories } from '../main-page/content';

const arr: Product[] = productsObj.products;
export let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysPrice: string[] = JSON.parse(localStorage.getItem('keysPrice')!) || [];
let keysStock: string[] = JSON.parse(localStorage.getItem('keysStock')!) || [];
let searchValue: string = localStorage.getItem('searchValue') || '';
let sortOption: string = localStorage.getItem('sortOption') || '';

export function brandsClick(brands: NodeListOf<HTMLElement>): void {
  for (let i = 0; i < brands.length; i++) {
    const prefix: string = brands[i].dataset.brand!;
    brands[i].addEventListener('click', (): void => {
      keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
      keysPrice = JSON.parse(localStorage.getItem('keysPrice')!) || [];
      keysStock = JSON.parse(localStorage.getItem('keysStock')!) || [];
      searchValue = localStorage.getItem('searchValue') || '';
      sortOption = localStorage.getItem('sortOption') || '';

      brands[i].classList.toggle('activeCategoryBrand');

      const activeFlag: boolean = brands[i].classList.contains('activeCategoryBrand');

      historyResolver(Location.brand, prefix, activeFlag);

      for (let j = 0; j < keysBrands.length; j++) {
        if (keysBrands[j].brand === brands[i].dataset.brand && !keysBrands[j].flag) {
          keysBrands[j].selected = true;
          keysBrands[j].flag = true;
        } else if (keysBrands[j].brand === brands[i].dataset.brand && keysBrands[j].flag) {
          keysBrands[j].selected = false;
          keysBrands[j].flag = false;
        }
      }
      keysBrandsFilter = keysBrands.filter((item: KeyBrand) => item.selected).map((item: KeyBrand) => item.brand);
      keysBrandsFilter = keysBrandsFilter.filter((item: string, index: number) => keysBrandsFilter.indexOf(item) === index);
      localStorage.setItem('keysBrands', JSON.stringify(keysBrands));
      localStorage.setItem('keysBrandsFilter', JSON.stringify(keysBrandsFilter));

      filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

      saveView();
      showFound();
      showNumbersBrandsCategories();
    });
  }
}

export function brandsQueryString(
  brands: NodeListOf<HTMLElement>,
  urlParams: URLSearchParams,
  queryStringArray: string[],
): void {
  let strBrands = '';
  if (urlParams.has('brands')) {
    strBrands = `&brands=${urlParams.getAll('brands').join('')}`;
  } else {
    strBrands = '';
  }
  localStorage.setItem('locationStringBrands', strBrands);

  const classNameArrayBrands = [];
  for (let i = 0; i < brands.length; i++) {
    if (queryStringArray.includes(brands[i].dataset.brand!)) {
      for (let j = 0; j < keysBrands.length; j++) {
        if (keysBrands[j].brand === brands[i].dataset.brand && !keysBrands[j].flag) {
          keysBrands[j].selected = true;
          keysBrands[j].flag = true;
        }
      }
      brands[i].classList.add('activeCategoryBrand');
    } else {
      for (let j = 0; j < keysBrands.length; j++) {
        if (keysBrands[j].brand === brands[i].dataset.brand && keysBrands[j].flag) {
          keysBrands[j].selected = false;
          keysBrands[j].flag = false;
        }
      }
      brands[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayBrands.push(brands[i].className);
  }
  localStorage.setItem('keysBrands', JSON.stringify(keysBrands));

  if (classNameArrayBrands.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationBrandsFlagTrue();
  } else {
    locationBrandsFlagFalse();
  }
}
