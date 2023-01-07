/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import { allNumbersBrands, allNumbersCategories } from '../logic/filter';

export class AddItem {
  array: string[];

  constructor(array: string[]) {
    this.array = array;
  }

  sortArr(): string[] {
    this.array = this.array
      .map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase())
      .sort();
    return [...new Set(this.array)];
  }

  addCategories(array: string[], node: HTMLElement): void {
    const allNumbers = JSON.parse(localStorage.getItem('allNumbersCategories')!) || allNumbersCategories;
    const currentNumbersCategories = JSON.parse(localStorage.getItem('currentNumbersCategories')!) || allNumbers;
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item category" data-category='${array[i]
    .toLowerCase()
    .replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount amount-category">(${currentNumbersCategories[i]}/${allNumbers[i]})</div>
        </div>
      `;
      node.insertAdjacentHTML('beforeend', item);
    }
  }

  addBrands(array: string[], node: HTMLElement): void {
    const allNumbers = JSON.parse(localStorage.getItem('allNumbersBrands')!) || allNumbersBrands;
    const currentNumbersBrands = JSON.parse(localStorage.getItem('currentNumbersBrands')!) || allNumbers;
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item brand" data-brand='${array[i]
    .toLowerCase()
    .replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount amount-brand">(${currentNumbersBrands[i]}/${allNumbers[i]})</div>
        </div>
      `;
      node.insertAdjacentHTML('beforeend', item);
    }
  }
}
