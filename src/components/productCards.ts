import { historyResolver } from '../routing/routing';
import { Location } from '../types';

export function productCardsClick(productCards:NodeListOf<HTMLElement>): void {
  for (let i = 0; i < productCards.length; i++) {
    const prefix: string = productCards[i].dataset.id!;
    productCards[i].addEventListener('click', (): void => {
      historyResolver(Location.detail, prefix);
    });
  }
}
