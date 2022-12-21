import { historyResolver } from '../routing/routing';
import { Location } from '../types';

export function searchInput(search: HTMLInputElement): void {
  search.addEventListener('input', (): void => {
    const prefix: string = search.value;

    historyResolver(Location.search, prefix);
  });
}

export function searchQueryString(search: HTMLInputElement, urlParams: URLSearchParams): void {
  let strSearch = '';
  if (urlParams.has('search')) {
    strSearch = `&search=${urlParams.getAll('search').join('')}`;
  } else {
    strSearch = '';
  }
  localStorage.setItem('locationStringSearch', strSearch);

  search.value = `${urlParams.getAll('search').join('')}`;
}
