import {
  bigButton,
  buttonsItems,
  descriptionItems,
  littleButton,
  pageCatalog,
} from '../utilities/nodes';
import { historyResolver } from '../routing/routing';
import { Location } from '../types';

export function addBigButtonClass(): void {
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

function addLittleButtonClass(): void {
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

    addLittleButtonClass();

    historyResolver(Location.littleBig, prefix);
  });
}

export function bigButtonClick(big: HTMLElement): void {
  big.addEventListener('click', () : void => {
    const prefix: string = 'true';

    addBigButtonClass();

    historyResolver(Location.littleBig, prefix);
  });
}

export function littleBigButtonsQueryString(urlParams: URLSearchParams): void {
  if (urlParams.getAll('big').join('') === 'false') {
    addLittleButtonClass();
  } else {
    addBigButtonClass();
  }
}
