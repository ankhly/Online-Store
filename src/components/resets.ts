import {
  brands,
  categories,
  search,
  sort,
} from '../utilities/nodes';
import { addBigButtonClass } from './littleBigButtons';
import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { productsObj } from '../utilities/data';
import { getKeys } from '../logic/filter';
import { showFiltered } from '../main-page/content';

function zeroingStylesPage(): void {
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
  addBigButtonClass(descriptionItems, pageCatalog, buttonsItems);
}

export function mainClick(main: HTMLElement): void {
  main.addEventListener('click', (): void => {
    zeroingStylesPage();
    historyResolver(Location.main);

    // filter and search
    localStorage.removeItem('keysCategories');
    localStorage.removeItem('keysBrands');
    localStorage.removeItem('keysCategoriesFilter');
    localStorage.removeItem('keysBrandsFilter');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('sortOption');
    // Отрисовка
    getKeys();
    const arr: Product[] = productsObj.products;
    showFiltered(arr);
  });
}

export function resetClick(reset: HTMLElement): void {
  reset.addEventListener('click', (): void => {
    zeroingStylesPage();
    historyResolver(Location.main);

    // filter and search
    localStorage.removeItem('keysCategories');
    localStorage.removeItem('keysBrands');
    localStorage.removeItem('keysCategoriesFilter');
    localStorage.removeItem('keysBrandsFilter');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('sortOption');
    // Отрисовка
    getKeys();
    const arr: Product[] = productsObj.products;
    showFiltered(arr);
  });
}
