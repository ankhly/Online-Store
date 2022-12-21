// Все (Logic)
export const categories = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
export const brands = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
export const sort = document.querySelector('#sort') as HTMLSelectElement;
export const search = document.querySelector('#search') as HTMLInputElement;
export const productCards = document.querySelectorAll('.buttons-item__details') as NodeListOf<HTMLElement>;
export const cart = document.querySelector('#cart') as HTMLElement;

// Все (Rendering)
// export const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;
// export const itemBrand = document.querySelector('.brands') as HTMLElement;
// export const itemCategory = document.querySelector('.categories') as HTMLElement;

// Сброс
export const main = document.querySelector('#main') as HTMLElement;
export const reset = document.querySelector('#reset') as HTMLElement;

// Маленькое или большое отображение
export const littleButton = document.querySelector('.view-head__big') as HTMLElement;
export const bigButton = document.querySelector('.view-head__small') as HTMLElement;
export const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
export const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
export const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;

// Input Range
export const rangeMins = document.querySelectorAll('.multi-range__min') as NodeListOf<HTMLInputElement>;
export const rangeMaxs = document.querySelectorAll('.multi-range__max') as NodeListOf<HTMLInputElement>;
export const valueFroms = document.querySelectorAll('.range-aside__from span') as NodeListOf<Element>;
export const valueTos = document.querySelectorAll('.range-aside__to span') as NodeListOf<Element>;
