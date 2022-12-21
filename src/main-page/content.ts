import { productsObj } from '../data';

const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;
const itemBrand = document.querySelector('.brands') as HTMLElement;
const itemCategory = document.querySelector('.categories') as HTMLElement;

const arrBrands: string[] = [];
const arrCategory: string[] = [];
const arr = productsObj.products;

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

  sortArr() {
    this.array = this.array
      .map((e) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase())
      .sort();
    return [...new Set(this.array)];
  }

  // eslint-disable-next-line class-methods-use-this
  addCategories(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item category" data-category='${array[i].toLowerCase()}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount">(5/5)</div>
        </div>
      `;
      itemCategory.insertAdjacentHTML('beforeend', item);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addBrands(array: string[]) {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item brand" data-brand='${array[i].toLowerCase()}'>
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

// ======

// const viewButtons = document.querySelector('.view-head__buttons') as HTMLElement;
// const viewBig = document.querySelector('.view-head__big') as HTMLElement;
// const viewSmall = document.querySelector('.view-head__small') as HTMLElement;
// const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
// const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
// const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
//
// function changeBlock(e: Event) {
//   for (let i = 0; i < descriptionItems.length; i++) {
//     const descriptionItem = descriptionItems[i] as HTMLElement;
//     const buttonsItem = buttonsItems[i] as HTMLElement;
//     if (e.target) {
//       if (e.target === viewBig) {
//         localStorage.setItem('BigBlock', 'big');
//         descriptionItem.style.display = 'none';
//         buttonsItem.classList.add('column');
//         pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(160px, 1fr))';
//       } else if (e.target === viewSmall) {
//         localStorage.removeItem('BigBlock');
//         descriptionItem.style.display = 'flex';
//         buttonsItem.classList.remove('column');
//         pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
//       }
//     }
//     if (localStorage.getItem('BigBlock')) {
//       descriptionItem.style.display = 'none';
//       buttonsItem.classList.add('column');
//       pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(160px, 1fr))';
//     } else {
//       descriptionItem.style.display = 'flex';
//       buttonsItem.classList.remove('column');
//       pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
//     }
//   }
// }
//
// viewButtons.addEventListener('click', changeBlock);
// window.addEventListener('DOMContentLoaded', changeBlock);

// ==================
