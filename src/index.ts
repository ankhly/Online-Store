import './style.scss';
import './main-page/content';

import {
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
  valueTos,
} from './utilities/nodes';
import { categoriesClick, categoriesQueryString } from './components/categories';
import { brandsClick, brandsQueryString } from './components/brands';
import { sortChange, sortQueryString } from './components/sort';
import { searchInput, searchQueryString } from './components/search';
import { bigButtonClick, littleButtonClick, littleBigButtonsQueryString } from './components/littleBigButtons';
import { mainClick, resetClick } from './components/resets';
import { productCardsClick } from './components/productCards';
import { cartClick } from './components/cart';
import { rangeMinMaxInput } from './components/rangeMinMax';

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
function queryStringLogic(): void {
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
}

// Стрелки вперед и назад in queryString
window.addEventListener('popstate', (event: PopStateEvent): void => {
  event.preventDefault();

  queryStringLogic();
});

// Для ручного ввода URL
queryStringLogic();
