import {
  bigButton,
  littleButton,
} from '../utilities/nodes';
import { historyResolver } from '../routing/routing';
import { Location } from '../types';

// новое
export function addBigButtonClass(
  descriptionItems: NodeListOf<Element>,
  pageCatalog: HTMLElement,
  buttonsItems: NodeListOf<Element>,
): void {
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

// новое
export function addLittleButtonClass(
  descriptionItems: NodeListOf<Element>,
  pageCatalog: HTMLElement,
  buttonsItems: NodeListOf<Element>,
): void {
  littleButton.classList.add('activeLittleBig');
  bigButton.classList.remove('activeLittleBig');
  for (let i = 0; i < descriptionItems.length; i++) {
    const descriptionItem = descriptionItems[i] as HTMLElement;
    const buttonsItem = buttonsItems[i] as HTMLElement;
    descriptionItem.style.display = 'none';
    buttonsItem.classList.add('column');
    pageCatalog.style.gridTemplateColumns = 'repeat(auto-fit, minmax(160px, 1fr))';
  }
}

export function littleButtonClick(little: HTMLElement): void {
  little.addEventListener('click', () : void => {
    const prefix: string = 'false';

    const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
    const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
    const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;

    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems);

    historyResolver(Location.littleBig, prefix);
  });
}

export function bigButtonClick(big: HTMLElement): void {
  big.addEventListener('click', () : void => {
    const prefix: string = 'true';

    const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
    const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
    const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;

    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems);

    historyResolver(Location.littleBig, prefix);
  });
}

// новое
export function littleBigButtonsQueryString(urlParams: URLSearchParams): void {
  const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
  const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
  const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
  if (urlParams.getAll('big').join('') === 'false') {
    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems);
  } else {
    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems);
  }
}

// saveView
export function saveView(): void {
  const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
  const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
  const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;

  if (littleButton.className.includes('activeLittleBig')) {
    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems);
  } else {
    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems);
  }
}
