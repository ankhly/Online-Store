import { productsObj } from '../utilities/data';
import {Product} from "../types";

const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;
const itemBrand = document.querySelector('.brands') as HTMLElement;
const itemCategory = document.querySelector('.categories') as HTMLElement;

const arrBrands: string[] = [];
const arrCategory: string[] = [];
const arr: Product[] = productsObj.products;

for (let i = 0; i < arr.length; i++) {
  arrBrands.push(arr[i].brand);
  arrCategory.push(arr[i].category);
  const item = `
    <div class="item-catalog__item" style="background-image: url(${arr[i].thumbnail})">
      <h2 class="item-catalog__title">${arr[i].title}</h2>
      <div class="item-catalog__description description-item">
        <div class="description-item__category">
          Category: <span>${arr[i].category}</span>
        </div>
        <div class="description-item__brand">
          Brand: <span>${arr[i].brand}</span>
        </div>
        <div class="description-item__price">Price: € ${arr[i].price}</div>
        <div class="description-item__discount">
          Discount: <span>${arr[i].discountPercentage}%</span>
        </div>
        <div class="description-item__rating">
          Rating: <span>${arr[i].rating}</span>
        </div>
        <div class="description-item__stock">
          Stock: <span>${arr[i].stock}</span>
        </div>
      </div>
      <div class="item-catalog__buttons buttons-item">
        <button class="buttons-item__add btn-item">
          add to cart
        </button>
        <button class="buttons-item__details btn-item" data-id="${arr[i].id}">
          details
        </button>
      </div>
    </div>
  `;
  itemCatalog.insertAdjacentHTML('beforeend', item);
}

class AddItem {
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

  // eslint-disable-next-line class-methods-use-this
  addCategories(array: string[]): void {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item category" data-category='${array[i].toLowerCase().replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount">(5/5)</div>
        </div>
      `;
      itemCategory.insertAdjacentHTML('beforeend', item);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addBrands(array: string[]): void {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item brand" data-brand='${array[i].toLowerCase().replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount">(1/1)</div>
        </div>
      `;
      itemBrand.insertAdjacentHTML('beforeend', item);
    }
  }
}
const brands = new AddItem(arrBrands);
const brandsSort = brands.sortArr();
brands.addBrands(brandsSort);
const categories = new AddItem(arrCategory);
const categorySort = categories.sortArr();
categories.addCategories(categorySort);
