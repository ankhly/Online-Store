/* eslint-disable import/no-cycle */
import { productsObj } from '../utilities/data';
import { Product } from '../types';
import { AddItem } from './addItem';

const arrBrands: string[] = [];
const arrCategory: string[] = [];
export const arrUrl: string[] = [];
export const arr: Product[] = productsObj.products;

for (let i = 0; i < arr.length; i++) {
  arrBrands.push(arr[i].brand);
  arrCategory.push(arr[i].category);
}

export function getPageHtml(): void {
  const body = document.querySelector('body') as HTMLElement;

  body.innerHTML = '';
  const mainContent = `
    <div class="wrapper">
      <header class="header">
        <div class="header__container container">
          <div class="header__body">
            <div class="header__logo logo-header" id="main">
              <div class="logo-header__icon"></div>
              <div class="logo-header__text">Online Store</div>
            </div>
            <div class="header__cart cart-header">
              <div class="cart-header__total">
                Cart total: € <span> 0</span>
              </div>
              <button class="cart-header__icon" id="cart">
                <img src="./cart.svg" alt="picture" />
                <span>0</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="page">
        <section class="page__main main-page">
          <div class="main-page__container container">
            <div class="main-page__body">
              <aside class="main-page__aside aside-page">
                <div class="aside-page__body">
                  <div class="aside-page__buttons buttons-aside">
                    <button class="buttons-aside__reset btn-aside" id="reset">
                      Reset Filters
                    </button>
                    <button class="buttons-aside__copy btn-aside">
                      Copy Link
                    </button>
                  </div>
                  <div class="aside-page__category category-aside">
                    <h3 class="category-aside__title title-aside">Category</h3>
                    <div class="category-aside__items item-sort categories"></div>
                  </div>
                  <div class="aside-page__brand brand-aside">
                    <h3 class="brand-aside__title title-aside">Brand</h3>
                    <div class="brand-aside__items item-sort brands"></div>
                  </div>
                  <div class="aside-page__range range-aside">
                    <h3 class="range-aside__title title-aside">Price</h3>
                    <div class="range-aside__values">
                      <div class="range-aside__from price-from">€ <span>0.00</span></div>
                      <div class="range-aside__to price-to">€ <span>1750.00</span></div>
                    </div>
                    <div class="range-aside__input multi-range">
                      <div class="multi-range__track"></div>
                      <input
                        type="range"
                        class="multi-range__min price-min"
                        data-range="price"
                        max="100"
                        min="0"
                        value="0"
                      />
                      <input
                        type="range"
                        class="multi-range__max price-max"
                        data-range="price"
                        max="100"
                        min="0"
                        value="100"
                      />
                    </div>
                  </div>
                  <div class="aside-page__range range-aside">
                    <h3 class="range-aside__title title-aside">Stock</h3>
                    <div class="range-aside__values">
                      <div class="range-aside__from stock-from"><span>0.00</span></div>
                      <div class="range-aside__to stock-to"><span>150.00</span></div>
                    </div>
                    <div class="range-aside__input multi-range">
                      <div class="multi-range__track"></div>
                      <input
                        type="range"
                        class="multi-range__min stock-min"
                        data-range="stock"
                        max="100"
                        min="0"
                        value="0"
                      />
                      <input
                        type="range"
                        class="multi-range__max stock-max"
                        data-range="stock"
                        max="100"
                        min="0"
                        value="100"
                      />
                    </div>
                  </div>
                </div>
              </aside>
              <div class="main-page__content">
                <div class="main-page__head head-catalog">
                  <div class="head-catalog__body">
                    <div class="head-catalog__sort sort-head">
                      <select class="sort-head__sort" id="sort">
                        <option value="Options" disabled>Sort options</option>
                        <option value="price-ASC">price-ASC</option>
                        <option value="price-DESC">prise-DESC</option>
                        <option value="rating-ASC">rating-ASC</option>
                        <option value="rating-DESC">rating-DESC</option>
                        <option value="discount-ASC">discount-ASC</option>
                        <option value="discount-DESC">discount-DESC</option>
                      </select>
                    </div>
                    <div class="head-catalog__found">
                      Found: <span id="found">${localStorage.getItem('found') || arr.length}</span>
                    </div>
                    <div class="head-catalog__search search-head">
                      <input
                        class="search-head__search-inp"
                        id="search"
                        type="text"
                        placeholder="Search product"
                      />
                    </div>
                    <div class="head-catalog__view view-head">
                      <div class="view-head__buttons">
                        <button class="view-head__big"></button>
                        <button class="view-head__small"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="main-page__catalog item-catalog"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer class="footer">
      <div class="footer__container container">
      <div class="footer__body">
    <div class="footer__git git">
      <h3 class="git__title">GitHub:</h3>
      <a href="https://github.com/ankhly" class="git__an name">ankhly</a>
      <a href="https://github.com/MaksimkaSota" class="git__ma name">MaksimkaSota</a>
    </div>
    <div class="footer__year">2023</div>
    <a href="https://rs.school/js/" class="footer__rs"></a>
    </div>
    </div>
  </footer>
    </div>
  `;
  body.insertAdjacentHTML('beforeend', mainContent);

  const itemBrand = document.querySelector('.brands') as HTMLElement;
  const itemCategory = document.querySelector('.categories') as HTMLElement;

  const brands = new AddItem(arrBrands);
  const brandsSort = brands.sortArr();
  brands.addBrands(brandsSort, itemBrand);
  const categories = new AddItem(arrCategory);
  const categorySort = categories.sortArr();
  categories.addCategories(categorySort, itemCategory);
}
getPageHtml();

export function copyLink(): void {
  const copy = document.querySelector('.buttons-aside__copy') as HTMLElement;
  copy.addEventListener('click', (): void => {
    const copyText = document.createElement('input') as HTMLInputElement;
    copyText.value = window.location.href;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
  });
}
copyLink();

export function showFiltered(filterArray: Product[]): void {
  const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;

  itemCatalog.innerHTML = '';
  arrUrl.length = 0;
  for (let i = 0; i < filterArray.length; i++) {
    arrUrl.push(filterArray[i].thumbnail);
    const item = `
      <div class="item-catalog__item" style="background: url(./loading.gif)">
        <h2 class="item-catalog__title">${filterArray[i].title}</h2>
        <div class="item-catalog__description description-item">
          <div class="description-item__category">
            Category: <span>${filterArray[i].category}</span>
          </div>
          <div class="description-item__brand">
            Brand: <span>${filterArray[i].brand}</span>
          </div>
          <div class="description-item__price">Price: € ${filterArray[i].price}</div>
          <div class="description-item__discount">
            Discount: <span>${filterArray[i].discountPercentage}%</span>
          </div>
          <div class="description-item__rating">
            Rating: <span>${filterArray[i].rating}</span>
          </div>
          <div class="description-item__stock">
            Stock: <span>${filterArray[i].stock}</span>
          </div>
        </div>
        <div class="item-catalog__buttons buttons-item">
          <button class="buttons-item__add btn-item">
            add to cart
          </button>
          <button class="buttons-item__details btn-item" data-id="${filterArray[i].id}">
            details
          </button>
        </div>
      </div>
    `;
    itemCatalog.insertAdjacentHTML('beforeend', item);
  }

  function loadImg(url:string) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = url;
      img.addEventListener('load', ():void => {
        setTimeout(() => {
          res(url);
        }, 1000);
      });
    });
  }
  Promise.all(arrUrl.map(loadImg)).then(
    (imgUrl) => {
      for (let i = 0; i < imgUrl.length; i++) {
        const catalogBgs = document.querySelectorAll('.item-catalog__item') as NodeListOf<Element>;
        const catalogBg = catalogBgs[i] as HTMLElement;
        if (catalogBg) {
          catalogBg.style.background = `url(${imgUrl[i]})`;
          catalogBg.style.backgroundSize = 'cover';
        }
      }
    },
  );
}

export function showNoProducts(): void {
  const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;

  itemCatalog.innerHTML = '';
  const item = '<div class="nofound">No Products Found!</div>';
  itemCatalog.insertAdjacentHTML('beforeend', item);
}

export function showFound(): void {
  const found = document.querySelector('#found') as HTMLElement;

  found.innerHTML = `${localStorage.getItem('found') || arr.length}`;
}

export function showNumbersBrandsCategories(): void {
  const amountCategory = document.querySelectorAll('.amount-category') as NodeListOf<HTMLElement>;
  const allNumbersCategories = JSON.parse(localStorage.getItem('allNumbersCategories')!);
  const currentNumbersCategories = JSON.parse(localStorage.getItem('currentNumbersCategories')!);

  for (let i = 0; i < amountCategory.length; i++) {
    amountCategory[i].innerHTML = `(${currentNumbersCategories[i]}/${allNumbersCategories[i]})`;
  }

  const amountBrand = document.querySelectorAll('.amount-brand') as NodeListOf<HTMLElement>;
  const allNumbersBrands = JSON.parse(localStorage.getItem('allNumbersBrands')!);
  const currentNumbersBrands = JSON.parse(localStorage.getItem('currentNumbersBrands')!);

  for (let i = 0; i < amountBrand.length; i++) {
    amountBrand[i].innerHTML = `(${currentNumbersBrands[i]}/${allNumbersBrands[i]})`;
  }
}
