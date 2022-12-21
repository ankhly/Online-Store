import { historyResolver } from '../routing/routing';
import { Location } from '../types';

export function sortChange(sort: HTMLSelectElement): void {
  sort.addEventListener('change', (): void => {
    const prefix: string = sort.options[sort.selectedIndex].value;

    historyResolver(Location.sort, prefix);
  });
}

export function sortQueryString(sort: HTMLSelectElement, urlParams: URLSearchParams): void {
  sort.value = `${urlParams.getAll('sort').join('')}` ? `${urlParams.getAll('sort').join('')}` : 'price-ASC';
}
