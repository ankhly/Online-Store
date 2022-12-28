import './style.scss';
import './main-page/content';

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

// Отрисовка
const arr: Product[] = productsObj.products;
filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);

// Выбор категории
categoriesClick(categories);
// Выбор брэнда
brandsClick(brands);
// Выбор сортировки
sortChange(sort);
// Поиск
searchInput(search);
// Кнопка мало
littleButtonClick(littleButton);
// // Кнопка много
bigButtonClick(bigButton);
// На главную (Сброс настроек)
mainClick(main);
// Сброс настроек
resetClick(reset);
// Input Range
rangeMinMaxInput(rangeMins, rangeMaxs, valueFroms, valueTos);

// queryStringLogic
export function queryStringLogic(): void {
  const queryString: string = window.location.search;

  // обнуляем при перезагрузке queryString если в карточках или деталях
  if (queryString.includes('cart') || queryString.includes('product-details')) {
    window.history.pushState({}, '', '/');
  }

  const queryStringArray: string[] = queryString.split(/\?|&|%E2%86%95/);
  const urlParams: URLSearchParams = new URLSearchParams(queryString);

  const categoriesNode = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
  const brandsNode = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
  const sortNode = document.querySelector('#sort') as HTMLSelectElement;
  const searchNode = document.querySelector('#search') as HTMLInputElement;

  // queryStringLogicCategories
  categoriesQueryString(categoriesNode, urlParams, queryStringArray);
  // queryStringLogicBrands
  brandsQueryString(brandsNode, urlParams, queryStringArray);
  // queryStringLogicSort
  sortQueryString(sortNode, urlParams);
  // queryStringLogicSearch
  searchQueryString(searchNode, urlParams);
  // queryStringLogicLittleBig
  littleBigButtonsQueryString(urlParams);
  // queryStringRangeMinMax
  rangeMinMaxQueryString(urlParams);

  // filter and search
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

  // чтобы сохранялся вид
  saveView();
  // found
  showFound();
  // numbers Brands and Categories
  showNumbersBrandsCategories();
}

// Стрелки вперед и назад in queryString
window.addEventListener('popstate', (event: PopStateEvent): void => {
  event.preventDefault();

  queryStringLogic();
});

// Для ручного ввода URL
queryStringLogic();
