import './style.scss';
import './main-page/main';
import './main-page/content';

import { Location } from './types';
import {
  historyResolver,
  locationCategoriesFlagTrue,
  locationBrandsFlagTrue,
  locationCategoriesFlagFalse,
  locationBrandsFlagFalse,
} from './routing/routing';

const categories = document.querySelectorAll('.category') as NodeListOf<HTMLElement>;
const brands = document.querySelectorAll('.brand') as NodeListOf<HTMLElement>;
const selectSort = document.querySelector('#sort') as HTMLSelectElement;
const inputSearch = document.querySelector('#search') as HTMLInputElement;
// const littleButton = document.querySelector('#little') as HTMLElement;
// const bigButton = document.querySelector('#big') as HTMLElement;
const productCards = document.querySelectorAll('.buttons-item__details') as NodeListOf<HTMLElement>;
const cart = document.querySelector('#cart') as HTMLElement;
const main = document.querySelector('#main') as HTMLElement;

// Кнопки маленькое или большое отображение
const littleButton = document.querySelector('.view-head__big') as HTMLElement;
const bigButton = document.querySelector('.view-head__small') as HTMLElement;
const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;

// Возможно выполнение этой функции не нужно, сейчас для наглядности.
// Все равно при нажатии на эти кнопки будет изменяться сожержимое страницы.
// Обнуление нужно только при нажатии main.
function zeroingStylesPage(): void {
  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.remove('activeCategoryBrand');
  }
  for (let i = 0; i < brands.length; i++) {
    brands[i].classList.remove('activeCategoryBrand');
  }
  inputSearch.value = '';
  selectSort.options[0].selected = true;
}

// Выбор категории
for (let i = 0; i < categories.length; i++) {
  const prefix: string = categories[i].dataset.category!;
  categories[i].addEventListener('click', (): void => {
    categories[i].classList.toggle('activeCategoryBrand');

    const activeFlag: boolean = categories[i].classList.contains('activeCategoryBrand');

    historyResolver(Location.category, prefix, activeFlag);
  });
}

// Выбор брэнда
for (let i = 0; i < brands.length; i++) {
  const prefix: string = brands[i].dataset.brand!;
  brands[i].addEventListener('click', (): void => {
    brands[i].classList.toggle('activeCategoryBrand');

    const activeFlag: boolean = brands[i].classList.contains('activeCategoryBrand');

    historyResolver(Location.brand, prefix, activeFlag);
  });
}

// Выбор сортировки
selectSort.addEventListener('change', (): void => {
  const prefix: string = selectSort.options[selectSort.selectedIndex].value;

  historyResolver(Location.sort, prefix);
});

// Поиск
inputSearch.addEventListener('input', (): void => {
  const prefix: string = inputSearch.value;

  historyResolver(Location.search, prefix);
});

// Кнопка мало
littleButton.addEventListener('click', () : void => {
  const prefix: string = 'false';

  littleButton.classList.add('activeLittleBig');
  bigButton.classList.remove('activeLittleBig');
  for (let i = 0; i < descriptionItems.length; i++) {
    const descriptionItem = descriptionItems[i] as HTMLElement;
    const buttonsItem = buttonsItems[i] as HTMLElement;
    descriptionItem.style.display = 'none';
    buttonsItem.classList.add('column');
    pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(160px, 1fr))';
  }

  historyResolver(Location.littleBig, prefix);
});

// // Кнопка много
bigButton.addEventListener('click', () : void => {
  const prefix: string = 'true';

  bigButton.classList.add('activeLittleBig');
  littleButton.classList.remove('activeLittleBig');
  for (let i = 0; i < descriptionItems.length; i++) {
    const descriptionItem = descriptionItems[i] as HTMLElement;
    const buttonsItem = buttonsItems[i] as HTMLElement;
    descriptionItem.style.display = 'flex';
    buttonsItem.classList.remove('column');
    pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
  }

  historyResolver(Location.littleBig, prefix);
});

// Выбор карточки
for (let j = 0; j < productCards.length; j++) {
  const prefix: string = productCards[j].dataset.id!;
  productCards[j].addEventListener('click', (): void => {
    zeroingStylesPage();
    historyResolver(Location.detail, prefix);
  });
}

// Корзина
cart.addEventListener('click', () : void => {
  zeroingStylesPage();
  historyResolver(Location.cart);
});

// На главную
main.addEventListener('click', (): void => {
  zeroingStylesPage();
  historyResolver(Location.main);
});

// queryStringLogic
function queryStringLogic() {
  const queryString = window.location.search;
  const queryStringArray = queryString.split(/\?|&|%E2%86%95/);
  const urlParams = new URLSearchParams(queryString);

  // queryStringLogicCategories
  let strCategories = '';
  if (urlParams.has('categories')) {
    strCategories = `&categories=${urlParams.getAll('categories').join('')}`;
  } else {
    strCategories = '';
  }
  localStorage.setItem('locationStringCategories', strCategories);

  const classNameArrayCategories = [];
  for (let i = 0; i < categories.length; i++) {
    if (queryStringArray.includes(categories[i].dataset.category!)) {
      categories[i].classList.add('activeCategoryBrand');
      // Сюда сортироку по категориям
    } else {
      categories[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayCategories.push(categories[i].className);
  }

  if (classNameArrayCategories.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationCategoriesFlagTrue();
  } else {
    locationCategoriesFlagFalse();
  }

  // queryStringLogicBrands
  let strBrands = '';
  if (urlParams.has('brands')) {
    strBrands = `&brands=${urlParams.getAll('brands').join('')}`;
  } else {
    strBrands = '';
  }
  localStorage.setItem('locationStringBrands', strBrands);

  const classNameArrayBrands = [];
  for (let i = 0; i < brands.length; i++) {
    if (queryStringArray.includes(brands[i].dataset.brand!)) {
      brands[i].classList.add('activeCategoryBrand');
      // Сюда сортироку по брендам
    } else {
      brands[i].classList.remove('activeCategoryBrand');
    }
    classNameArrayBrands.push(brands[i].className);
  }

  if (classNameArrayBrands.every((elem: string): boolean => !elem.includes('activeCategoryBrand'))) {
    locationBrandsFlagTrue();
  } else {
    locationBrandsFlagFalse();
  }

  // queryStringLogicSort
  selectSort.value = `${urlParams.getAll('sort').join('')}` ? `${urlParams.getAll('sort').join('')}` : 'price-ASC';

  // queryStringLogicSearch
  let strSearch = '';
  if (urlParams.has('search')) {
    strSearch = `&search=${urlParams.getAll('search').join('')}`;
  } else {
    strSearch = '';
  }
  localStorage.setItem('locationStringSearch', strSearch);

  inputSearch.value = `${urlParams.getAll('search').join('')}`;

  // queryStringLogicLittleBig
  if (urlParams.getAll('big').join('') === 'false') {
    littleButton.classList.add('activeLittleBig');
    bigButton.classList.remove('activeLittleBig');
    for (let i = 0; i < descriptionItems.length; i++) {
      const descriptionItem = descriptionItems[i] as HTMLElement;
      const buttonsItem = buttonsItems[i] as HTMLElement;
      descriptionItem.style.display = 'none';
      buttonsItem.classList.add('column');
      pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(160px, 1fr))';
    }
  } else {
    bigButton.classList.add('activeLittleBig');
    littleButton.classList.remove('activeLittleBig');
    for (let i = 0; i < descriptionItems.length; i++) {
      const descriptionItem = descriptionItems[i] as HTMLElement;
      const buttonsItem = buttonsItems[i] as HTMLElement;
      descriptionItem.style.display = 'flex';
      buttonsItem.classList.remove('column');
      pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
    }
  }
}

// Стрелки вперед и назад
window.addEventListener('popstate', (event: PopStateEvent): void => {
  event.preventDefault();

  queryStringLogic();
});

// Для ручного ввода URL (В одну функцию);
queryStringLogic();
