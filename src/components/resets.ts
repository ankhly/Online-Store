import {
  brands,
  categories,
  search,
  sort,
} from '../utilities/nodes';
import { addBigButtonClass } from './littleBigButtons';
import { historyResolver } from '../routing/routing';
import { Location } from '../types';

function zeroingStylesPage(): void {
  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.remove('activeCategoryBrand');
  }
  for (let i = 0; i < brands.length; i++) {
    brands[i].classList.remove('activeCategoryBrand');
  }
  search.value = '';
  sort.options[0].selected = true;
  addBigButtonClass();
}

export function mainClick(main: HTMLElement): void {
  main.addEventListener('click', (): void => {
    zeroingStylesPage();
    historyResolver(Location.main);
  });
}

export function resetClick(reset: HTMLElement): void {
  reset.addEventListener('click', (): void => {
    zeroingStylesPage();
    historyResolver(Location.main);
  });
}
