import { historyResolver } from '../routing/routing';
import { Location } from '../types';

export function addBigButtonClass(
  descriptionItems: NodeListOf<Element>,
  pageCatalog: HTMLElement,
  buttonsItems: NodeListOf<Element>,
  littleButton: HTMLElement,
  bigButton: HTMLElement,
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

export function addLittleButtonClass(
  descriptionItems: NodeListOf<Element>,
  pageCatalog: HTMLElement,
  buttonsItems: NodeListOf<Element>,
  littleButton: HTMLElement,
  bigButton: HTMLElement,
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
    const littleButton = document.querySelector('.view-head__big') as HTMLElement;
    const bigButton = document.querySelector('.view-head__small') as HTMLElement;

    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);

    historyResolver(Location.littleBig, prefix);
  });
}

export function bigButtonClick(big: HTMLElement): void {
  big.addEventListener('click', () : void => {
    const prefix: string = 'true';

    const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
    const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
    const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
    const littleButton = document.querySelector('.view-head__big') as HTMLElement;
    const bigButton = document.querySelector('.view-head__small') as HTMLElement;

    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);

    historyResolver(Location.littleBig, prefix);
  });
}

export function littleBigButtonsQueryString(urlParams: URLSearchParams): void {
  const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
  const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
  const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
  const littleButton = document.querySelector('.view-head__big') as HTMLElement;
  const bigButton = document.querySelector('.view-head__small') as HTMLElement;

  if (urlParams.getAll('big').join('') === 'false') {
    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);
  } else {
    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);
  }
}

export function saveView(): void {
  const descriptionItems = document.querySelectorAll('.description-item ') as NodeListOf<Element>;
  const pageCatalog = document.querySelector('.main-page__catalog') as HTMLElement;
  const buttonsItems = document.querySelectorAll('.buttons-item') as NodeListOf<Element>;
  const littleButton = document.querySelector('.view-head__big') as HTMLElement;
  const bigButton = document.querySelector('.view-head__small') as HTMLElement;

  if (littleButton.className.includes('activeLittleBig')) {
    addLittleButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);
  } else {
    addBigButtonClass(descriptionItems, pageCatalog, buttonsItems, littleButton, bigButton);
  }
}
