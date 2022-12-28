import { historyResolver } from '../routing/routing';
import { Location, Product } from '../types';
import { productsObj } from '../utilities/data';
import { filtering } from '../logic/filter';
import { saveView } from './littleBigButtons';
import { showFound, showNumbersBrandsCategories } from '../main-page/content';

function slideMin(rangeMax: HTMLInputElement, rangeMin: HTMLInputElement, valueFrom: HTMLElement, a: number): void {
  if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
    rangeMin.value = rangeMax.value;
  }
  valueFrom.textContent = `${Math.round((a * Number(rangeMin.value)) / 100)}.00`;
}

function slideMax(rangeMax: HTMLInputElement, rangeMin: HTMLInputElement, valueTo: HTMLElement, a: number) {
  if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
    rangeMax.value = rangeMin.value;
  }
  valueTo.textContent = `${Math.round((a * Number(rangeMax.value)) / 100)}.00`;
}

// for filtering logic
export let keysPrice: string[] = JSON.parse(localStorage.getItem('keysPrice')!) || [];
export let keysStock: string[] = JSON.parse(localStorage.getItem('keysStock')!) || [];
const arr: Product[] = productsObj.products;
let keysBrandsFilter: string[] = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
let keysCategoriesFilter: string[] = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
let searchValue: string = localStorage.getItem('searchValue') || '';
let sortOption: string = localStorage.getItem('sortOption') || '';

export function rangeMinMaxInput(
  rangeMins: NodeListOf<HTMLInputElement>,
  rangeMaxs: NodeListOf<HTMLInputElement>,
  valueFroms: NodeListOf<HTMLElement>,
  valueTos: NodeListOf<HTMLElement>,
): void {
  for (let i = 0; i < rangeMins.length; i++) {
    const rangeMin = rangeMins[i] as HTMLInputElement;
    const rangeMax = rangeMaxs[i] as HTMLInputElement;
    const valueFrom = valueFroms[i];
    const valueTo = valueTos[i];
    const a = Number(valueTo.textContent);

    rangeMin.addEventListener('input', (): void => {
      slideMin(rangeMax, rangeMin, valueFrom, a);
      keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
      keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
      searchValue = localStorage.getItem('searchValue') || '';
      sortOption = localStorage.getItem('sortOption') || '';

      // filter
      if (rangeMax.dataset.range === 'price' || rangeMin.dataset.range === 'price') {
        if (valueFrom.textContent && valueTo.textContent) {
          const prefix1: string = valueFrom.textContent.split('.').slice(0, 1).join('');
          const prefix2: string = valueTo.textContent.split('.').slice(0, 1).join('');
          const prefix: string = `${prefix1}↕${prefix2}`;

          keysPrice = [prefix1, prefix2];
          localStorage.setItem('keysPrice', JSON.stringify(keysPrice));

          historyResolver(Location.price, prefix);

          filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);
        }
      }
      if (rangeMax.dataset.range === 'stock' || rangeMin.dataset.range === 'stock') {
        if (valueFrom.textContent && valueTo.textContent) {
          const prefix1: string = valueFrom.textContent.split('.').slice(0, 1).join('');
          const prefix2: string = valueTo.textContent.split('.').slice(0, 1).join('');
          const prefix: string = `${prefix1}↕${prefix2}`;

          keysStock = [prefix1, prefix2];
          localStorage.setItem('keysStock', JSON.stringify(keysStock));

          historyResolver(Location.stock, prefix);

          filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);
        }
      }

      // чтобы сохранялся вид
      saveView();
      // found
      showFound();
      // numbersCategories
      showNumbersBrandsCategories();
    });

    rangeMax.addEventListener('input', (): void => {
      slideMax(rangeMax, rangeMin, valueTo, a);
      keysBrandsFilter = JSON.parse(localStorage.getItem('keysBrandsFilter')!) || [];
      keysCategoriesFilter = JSON.parse(localStorage.getItem('keysCategoriesFilter')!) || [];
      searchValue = localStorage.getItem('searchValue') || '';
      sortOption = localStorage.getItem('sortOption') || '';

      // filter
      if (rangeMax.dataset.range === 'price' || rangeMin.dataset.range === 'price') {
        if (valueTo.textContent && valueFrom.textContent) {
          const prefix1: string = valueFrom.textContent.split('.').slice(0, 1).join('');
          const prefix2: string = valueTo.textContent.split('.').slice(0, 1).join('');
          const prefix: string = `${prefix1}↕${prefix2}`;

          keysPrice = [prefix1, prefix2];
          localStorage.setItem('keysPrice', JSON.stringify(keysPrice));

          historyResolver(Location.price, prefix);

          filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);
        }
      }
      if (rangeMax.dataset.range === 'stock' || rangeMin.dataset.range === 'stock') {
        if (valueTo.textContent && valueFrom.textContent) {
          const prefix1: string = valueFrom.textContent.split('.').slice(0, 1).join('');
          const prefix2: string = valueTo.textContent.split('.').slice(0, 1).join('');
          const prefix: string = `${prefix1}↕${prefix2}`;

          keysStock = [prefix1, prefix2];
          localStorage.setItem('keysStock', JSON.stringify(keysStock));

          historyResolver(Location.stock, prefix);

          filtering(arr, keysCategoriesFilter, keysBrandsFilter, searchValue, sortOption, keysPrice, keysStock);
        }
      }

      // чтобы сохранялся вид
      saveView();
      // found
      showFound();
      // numbersCategories
      showNumbersBrandsCategories();
    });
  }
}

export function rangeMinMaxQueryString(
  urlParams: URLSearchParams,
): void {
  if (urlParams.has('price')) {
    const rangeMinPriceNode = document.querySelector('.price-min') as HTMLInputElement;
    const rangeMaxPriceNode = document.querySelector('.price-max') as HTMLInputElement;
    const valueFromPriceNode = document.querySelector('.price-from span') as HTMLElement;
    const valueToPriceNode = document.querySelector('.price-to span') as HTMLElement;

    const a = 1749;

    const min = Number(urlParams.getAll('price').join('').split('↕')[0]);
    const max = Number(urlParams.getAll('price').join('').split('↕')[1]);

    rangeMinPriceNode.value = `${(100 * min) / a}`;
    rangeMaxPriceNode.value = `${(100 * max) / a}`;

    valueFromPriceNode.innerHTML = `${min}.00`;
    valueToPriceNode.textContent = `${max}.00`;
  }

  if (urlParams.has('stock')) {
    const rangeMinStockNode = document.querySelector('.stock-min') as HTMLInputElement;
    const rangeMaxStockNode = document.querySelector('.stock-max') as HTMLInputElement;
    const valueFromStockNode = document.querySelector('.stock-from span') as HTMLElement;
    const valueToStockNode = document.querySelector('.stock-to span') as HTMLElement;

    const a = 150;

    const min = Number(urlParams.getAll('stock').join('').split('↕')[0]);
    const max = Number(urlParams.getAll('stock').join('').split('↕')[1]);

    rangeMinStockNode.value = `${(100 * min) / a}`;
    rangeMaxStockNode.value = `${(100 * max) / a}`;

    valueFromStockNode.textContent = `${min}`;
    valueToStockNode.textContent = `${max}`;
  }
}
