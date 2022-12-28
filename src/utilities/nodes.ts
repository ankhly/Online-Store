// Все (Logic)
export const categories = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
export const brands = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
export const sort = document.querySelector('#sort') as HTMLSelectElement;
export const search = document.querySelector('#search') as HTMLInputElement;
export const productCards = document.querySelectorAll('.buttons-item__details') as NodeListOf<HTMLElement>;
export const cart = document.querySelector('#cart') as HTMLElement;

// Сброс
export const main = document.querySelector('#main') as HTMLElement;
export const reset = document.querySelector('#reset') as HTMLElement;

// Маленькое или большое отображение
export const littleButton = document.querySelector('.view-head__big') as HTMLElement;
export const bigButton = document.querySelector('.view-head__small') as HTMLElement;

// Input Range
export const rangeMins = document.querySelectorAll('.multi-range__min') as NodeListOf<HTMLInputElement>;
export const rangeMaxs = document.querySelectorAll('.multi-range__max') as NodeListOf<HTMLInputElement>;
export const valueFroms = document.querySelectorAll('.range-aside__from span') as NodeListOf<Element>;
export const valueTos = document.querySelectorAll('.range-aside__to span') as NodeListOf<Element>;

// Детали товара
export const mainPage = document.querySelector('.main-page__body') as HTMLElement;
