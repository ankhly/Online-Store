import './style.scss';
import './main-page/content';
import './form/form';

import {
  categories, brands, sort, search, main, reset, littleButton, bigButton, valueFroms, rangeMaxs, rangeMins, valueTos,
} from './utilities/nodes';
import { showFound, showNumbersBrandsCategories } from './main-page/content';
import { brandsClick, brandsQueryString, keysBrandsFilter } from './components/brands';
import { categoriesClick, categoriesQueryString, keysCategoriesFilter } from './components/categories';
import { rangeMinMaxInput, rangeMinMaxQueryString, keysPrice, keysStock } from './components/rangeMinMax';
import { sortChange, sortQueryString, sortOption } from './components/sort';
import { searchInput, searchQueryString, searchValue } from './components/search';
import {
  bigButtonClick, littleButtonClick, littleBigButtonsQueryString, saveView,
} from './components/littleBigButtons';
import { mainClick, resetClick } from './components/resets';
import { filtering } from './logic/filter';
import { Product } from './types';
import { productsObj } from './utilities/data';

const arr: Product[] = productsObj.products;
filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

categoriesClick(categories);
brandsClick(brands);
sortChange(sort);
searchInput(search);
littleButtonClick(littleButton);
bigButtonClick(bigButton);
mainClick(main);
resetClick(reset);
rangeMinMaxInput(rangeMins, rangeMaxs, valueFroms, valueTos);

export function queryStringLogic(): void {
  const queryString: string = window.location.search;

  if (queryString.includes('cart') || queryString.includes('product-details')) {
    window.history.pushState({}, '', '/');
  }

  const queryStringArray: string[] = queryString.split(/\?|&|%E2%86%95/);
  const urlParams: URLSearchParams = new URLSearchParams(queryString);

  const categoriesNode = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
  const brandsNode = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
  const sortNode = document.querySelector('#sort') as HTMLSelectElement;
  const searchNode = document.querySelector('#search') as HTMLInputElement;

  categoriesQueryString(categoriesNode, urlParams, queryStringArray);
  brandsQueryString(brandsNode, urlParams, queryStringArray);
  sortQueryString(sortNode, urlParams);
  searchQueryString(searchNode, urlParams);
  littleBigButtonsQueryString(urlParams);
  rangeMinMaxQueryString(urlParams);

  const keysCategoriesFilterQueryString = urlParams.getAll('categories').join('').split('↕').splice(1);
  const keysBrandsFilterQueryString = urlParams.getAll('brands').join('').split('↕').splice(1);
  const keySearchQueryString = urlParams.getAll('search').join('');
  const keySortQueryString = urlParams.getAll('sort').join('');
  let keysPriceQueryString;
  if (urlParams.has('price')) {
    keysPriceQueryString = urlParams.getAll('price').join('').split('↕');
  } else {
    keysPriceQueryString = ['0', '1750'];
  }
  let keysStockQueryString;
  if (urlParams.has('stock')) {
    keysStockQueryString = urlParams.getAll('stock').join('').split('↕');
  } else {
    keysStockQueryString = ['0', '150'];
  }

  localStorage.setItem('keysCategoriesFilter', JSON.stringify(keysCategoriesFilterQueryString));
  localStorage.setItem('keysBrandsFilter', JSON.stringify(keysBrandsFilterQueryString));
  localStorage.setItem('searchValue', keySearchQueryString);
  localStorage.setItem('sortOption', keySortQueryString);
  localStorage.setItem('keysPrice', JSON.stringify(keysPriceQueryString));
  localStorage.setItem('keysStock', JSON.stringify(keysStockQueryString));

  filtering(arr, keysCategoriesFilterQueryString, keysBrandsFilterQueryString, keySearchQueryString, keySortQueryString, keysPriceQueryString, keysStockQueryString);

  saveView();
  showFound();
  showNumbersBrandsCategories();
}

window.addEventListener('popstate', (event: PopStateEvent): void => {
  event.preventDefault();

  queryStringLogic();
});

queryStringLogic();

console.log(`
  Score: 230 / 300
  Страница товаров с фильтрами (score: 110).
  Страница корзины выбранных товаров (score: 30).
  Модальное окно оформления(покупки) выбранных товаров (score: 45).
  Страница с описанием товара (score: 25).
  Header, содержащий кол-во добавленных в корзину товаров и общую сумму покупок (score: 20).
  Страница 404 (score: 0).
`);
