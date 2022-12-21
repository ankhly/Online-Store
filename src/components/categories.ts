import { historyResolver, locationCategoriesFlagFalse, locationCategoriesFlagTrue } from '../routing/routing';
import { Location } from '../types';

export function categoriesClick(categories: NodeListOf<HTMLElement>): void {
  for (let i = 0; i < categories.length; i++) {
    const prefix: string = categories[i].dataset.category!;
    categories[i].addEventListener('click', (): void => {
      categories[i].classList.toggle('activeCategoryBrand');

      const activeFlag: boolean = categories[i].classList.contains('activeCategoryBrand');

      historyResolver(Location.category, prefix, activeFlag);
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
      categories[i].classList.add('activeCategoryBrand');
    } else {
      categories[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayCategories.push(categories[i].className);
  }

  if (classNameArrayCategories.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationCategoriesFlagTrue();
  } else {
    locationCategoriesFlagFalse();
  }
}
