import './style.scss';
import './main-page/content';

import {
  addToCard,
  categories,
  brands,
  sort,
  search,
  productCards,
  cart,
  main,
  reset,
  littleButton,
  bigButton,
  rangeMins,
  rangeMaxs,
  valueFroms,
  valueTos, cartBtn,
} from './utilities/nodes';
import {
  categoriesClick,
  categoriesQueryString, keysCategoriesFilter,
} from './components/categories';
import {brandsClick, brandsQueryString, keysBrandsFilter} from './components/brands';
import { sortChange, sortOption, sortQueryString } from './components/sort';
import {searchInput, searchQueryString, searchValue} from './components/search';
import {
  bigButtonClick,
  littleButtonClick,
  littleBigButtonsQueryString, saveView,
} from './components/littleBigButtons';
import { mainClick, resetClick } from './components/resets';
import { productCardsClick } from './components/productCards';
import { cartClick } from './components/cart';
import { rangeMinMaxInput } from './components/rangeMinMax';
import { productCardsDetails } from './details/details';
import {addToCardClick, cartBtnClick} from './cart/cart';
import {filtering} from "./logic/filter";
import {Product} from "./types";
import { productsObj } from './utilities/data';

// Отрисовка
const arr: Product[] = productsObj.products;
filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption);

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
// Выбор карточки
productCardsClick(productCards);
// Корзина
cartClick(cart);
// На главную (Сброс настроек)
mainClick(main);
// Сброс настроек
resetClick(reset);
// Input Range
rangeMinMaxInput(rangeMins, rangeMaxs, valueFroms, valueTos);

// queryStringLogic
export function queryStringLogic(): void {
  const queryString: string = window.location.search;
  const queryStringArray: string[] = queryString.split(/\?|&|%E2%86%95/);
  const urlParams: URLSearchParams = new URLSearchParams(queryString);
  // queryStringLogicCategories
  categoriesQueryString(categories, urlParams, queryStringArray);
  // queryStringLogicBrands
  brandsQueryString(brands, urlParams, queryStringArray);
  // queryStringLogicSort
  sortQueryString(sort, urlParams);
  // queryStringLogicSearch
  searchQueryString(search, urlParams);
  // queryStringLogicLittleBig
  littleBigButtonsQueryString(urlParams);

  // filter and search
  const keysCategoriesFilterQueryString = urlParams.getAll('categories').join('').split('↕').splice(1);
  const keysBrandsFilterQueryString = urlParams.getAll('brands').join('').split('↕').splice(1);
  const keySearchQueryString = urlParams.getAll('search').join('');
  const keySortQueryString = urlParams.getAll('sort').join('');
  localStorage.setItem('keysCategoriesFilter', JSON.stringify(keysCategoriesFilterQueryString));
  localStorage.setItem('keysBrandsFilter', JSON.stringify(keysBrandsFilterQueryString));
  localStorage.setItem('searchValue', keySearchQueryString);
  localStorage.setItem('sortOption', keySortQueryString);
  filtering(arr, keysCategoriesFilterQueryString, keysBrandsFilterQueryString, keySearchQueryString, keySortQueryString);

  // чтобы сохранялся вид
  saveView();
}

// Стрелки вперед и назад in queryString
window.addEventListener('popstate', (event: PopStateEvent): void => {
  event.preventDefault();

  queryStringLogic();
});

// Для ручного ввода URL
queryStringLogic();
