import {
  historyResolver, locationCategoriesFlagFalse, locationCategoriesFlagTrue
} from '../routing/routing';
import { Product, Location, KeyCategory } from '../types';
import { filtering, keysCategories } from '../logic/filter';
import { productsObj } from '../utilities/data';
import { saveView } from './littleBigButtons';
import { showFound, showNumbersBrandsCategories } from '../main-page/content';

// for filter
const arr: Product[] = productsObj.products;
export let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
let keysPrice: string[] = JSON.parse(localStorage.getItem('keysPrice')!) || [];
let keysStock: string[] = JSON.parse(localStorage.getItem('keysStock')!) || [];
let searchValue: string = localStorage.getItem('searchValue') || '';
let sortOption: string = localStorage.getItem('sortOption') || '';

export function categoriesClick(categories: NodeListOf<HTMLElement>): void {
  for (let i = 0; i < categories.length; i++) {
    const prefix: string = categories[i].dataset.category!;
    categories[i].addEventListener('click', (): void => {
      keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
      keysPrice = JSON.parse(localStorage.getItem('keysPrice')!) || [];
      keysStock = JSON.parse(localStorage.getItem('keysStock')!) || [];
      searchValue = localStorage.getItem('searchValue') || '';
      sortOption = localStorage.getItem('sortOption') || '';

      categories[i].classList.toggle('activeCategoryBrand');

      const activeFlag: boolean = categories[i].classList.contains('activeCategoryBrand');

      historyResolver(Location.category, prefix, activeFlag);

      // filter
      for (let j = 0; j < keysCategories.length; j++) {
        if (keysCategories[j].category === categories[i].dataset.category && !keysCategories[j].flag) {
          keysCategories[j].selected = true;
          keysCategories[j].flag = true;
        } else if (keysCategories[j].category === categories[i].dataset.category && keysCategories[j].flag) {
          keysCategories[j].selected = false;
          keysCategories[j].flag = false;
        }
      }
      keysCategoriesFilter = keysCategories.filter((item: KeyCategory) => item.selected).map((item: KeyCategory) => item.category);
      keysCategoriesFilter = keysCategoriesFilter.filter((item: string, index: number) => keysCategoriesFilter.indexOf(item) === index);
      localStorage.setItem('keysCategories', JSON.stringify(keysCategories));
      localStorage.setItem('keysCategoriesFilter', JSON.stringify(keysCategoriesFilter));

      filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

      // чтобы сохранялся вид
      saveView();
      // found
      showFound();
      // numbersCategories
      showNumbersBrandsCategories();
    });
  }
}

export function categoriesQueryString(
  categories: NodeListOf<HTMLElement>,
  urlParams: URLSearchParams,
  queryStringArray: string[],
): void {
  let strCategories = '';
  if (urlParams.has('categories')) {
    strCategories = `&categories=${urlParams.getAll('categories').join('')}`;
  } else {
    strCategories = '';
  }
  localStorage.setItem('locationStringCategories', strCategories);

  const classNameArrayCategories = [];
  for (let i = 0; i < categories.length; i++) {
    if (queryStringArray.includes(categories[i].dataset.category!)) {
      // filter
      for (let j = 0; j < keysCategories.length; j++) {
        if (keysCategories[j].category === categories[i].dataset.category && !keysCategories[j].flag) {
          keysCategories[j].selected = true;
          keysCategories[j].flag = true;
        }
      }
      categories[i].classList.add('activeCategoryBrand');
    } else {
      // filter
      for (let j = 0; j < keysCategories.length; j++) {
        if (keysCategories[j].category === categories[i].dataset.category && keysCategories[j].flag) {
          keysCategories[j].selected = false;
          keysCategories[j].flag = false;
        }
      }
      categories[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayCategories.push(categories[i].className);
  }
  // filter
  localStorage.setItem('keysCategories', JSON.stringify(keysCategories));

  if (classNameArrayCategories.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationCategoriesFlagTrue();
  } else {
    locationCategoriesFlagFalse();
  }
}
