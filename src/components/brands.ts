import { historyResolver, locationBrandsFlagFalse, locationBrandsFlagTrue } from '../routing/routing';
import { Location } from '../types';

export function brandsClick(brands: NodeListOf<HTMLElement>): void {
  for (let i = 0; i < brands.length; i++) {
    const prefix: string = brands[i].dataset.brand!;
    brands[i].addEventListener('click', (): void => {
      brands[i].classList.toggle('activeCategoryBrand');

      const activeFlag: boolean = brands[i].classList.contains('activeCategoryBrand');

      historyResolver(Location.brand, prefix, activeFlag);
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
      brands[i].classList.add('activeCategoryBrand');
    } else {
      brands[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayBrands.push(brands[i].className);
  }

  if (classNameArrayBrands.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationBrandsFlagTrue();
  } else {
    locationBrandsFlagFalse();
  }
}
