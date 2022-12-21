import { historyResolver } from "../routing/routing";
import { Location } from '../types';

export function cartClick(cart: HTMLElement): void {
  cart.addEventListener('click', () : void => {
    historyResolver(Location.cart);
  });
}
