import {
  addBigButtonClass, bigButtonClick, littleButtonClick,
} from './littleBigButtons';
import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { productsObj } from '../utilities/data';
import { filtering, getKeys } from '../logic/filter';
import { copyLink, getPageHtml } from '../main-page/content';
import { categoriesClick } from './categories';
import { brandsClick } from './brands';
import { searchInput } from './search';
import { sortChange } from './sort';
import { rangeMinMaxInput } from './rangeMinMax';
import { queryStringLogic } from '../index';

function zeroingStylesPage(): void {
  const categories = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
  const brands = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
  const sort = document.querySelector('#sort') as HTMLSelectElement;
  const search = document.querySelector('#search') as HTMLInputElement;

  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.remove('activeCategoryBrand');
  }
  for (let i = 0; i < brands.length; i++) {
    brands[i].classList.remove('activeCategoryBrand');
  }
  search.value = '';
  sort.options[0].selected = true;

  const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
  const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
  const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
  const littleButton = document.querySelector('.view-head__big') as HTMLElement;
  const bigButton = document.querySelector('.view-head__small') as HTMLElement;
  addBigButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);
}

function removingLocalStorage() {
  localStorage.removeItem('keysCategories');
  localStorage.removeItem('keysBrands');
  localStorage.removeItem('keysCategoriesFilter');
  localStorage.removeItem('keysBrandsFilter');
  localStorage.removeItem('searchValue');
  localStorage.removeItem('sortOption');
  localStorage.removeItem('keysPrice');
  localStorage.removeItem('keysStock');
  // обнуление при перезагрузке
  localStorage.removeItem('countCart');
  localStorage.removeItem('arrCart');
  localStorage.removeItem('total');
  // обнуление found, brands, categories
  localStorage.removeItem('found');
  localStorage.removeItem('currentNumbersCategories');
  localStorage.removeItem('currentNumbersBrands');
}

function rendering() {
  getKeys();
  getPageHtml();
  const arr: Product[] = productsObj.products;
  filtering(arr, [], [], '', '', ['0', '1749'], ['0', '150']);

  const categoriesNode = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
  const brandsNode = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
  const sortNode = document.querySelector('#sort') as HTMLSelectElement;
  const searchNode = document.querySelector('#search') as HTMLInputElement;
  const mainNode = document.querySelector('#main') as HTMLElement;
  const reset = document.querySelector('#reset') as HTMLElement;
  const littleButton = document.querySelector('.view-head__big') as HTMLElement;
  const bigButton = document.querySelector('.view-head__small') as HTMLElement;
  const rangeMins = document.querySelectorAll('.multi-range__min') as NodeListOf<HTMLInputElement>;
  const rangeMaxs = document.querySelectorAll('.multi-range__max') as NodeListOf<HTMLInputElement>;
  const valueFroms = document.querySelectorAll('.range-aside__from span') as NodeListOf<HTMLElement>;
  const valueTos = document.querySelectorAll('.range-aside__to span') as NodeListOf<HTMLElement>;

  // Выбор категории
  categoriesClick(categoriesNode);
  // Выбор брэнда
  brandsClick(brandsNode);
  // Выбор сортировки
  sortChange(sortNode);
  // Поиск
  searchInput(searchNode);
  // Кнопка мало
  littleButtonClick(littleButton);
  // Кнопка много
  bigButtonClick(bigButton);
  // На главную (Сброс настроек)
  mainClick(mainNode);
  // Сброс настроек
  resetClick(reset);
  // Input Range
  rangeMinMaxInput(rangeMins, rangeMaxs, valueFroms, valueTos);

  zeroingStylesPage();

  // queryStringLogic
  queryStringLogic();

  // copy
  copyLink();
}

export function mainClick(main: HTMLElement): void {
  main.addEventListener('click', (): void => {
    historyResolver(Location.main);

    // filter and search
    removingLocalStorage();

    // Отрисовка
    rendering();
  });
}

export function resetClick(reset: HTMLElement): void {
  reset.addEventListener('click', (): void => {
    historyResolver(Location.main);

    // filter and search
    removingLocalStorage();

    // Отрисовка
    rendering();
  });
}
