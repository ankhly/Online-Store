import { Location, Product } from '../types';
import { historyResolver } from '../routing/routing';
import { addCartCount, removeCartCount } from '../cart/cart';
import { btnClick } from '../forma/forma';

export function productCardsDetails(filterArray: Product[], productCards: NodeListOf<HTMLElement>): void {
  for (let i = 0; i < productCards.length; i++) {
    const prefix: string = productCards[i].dataset.id!;
    productCards[i].addEventListener('click', (): void => {
      historyResolver(Location.detail, prefix);
    });
  }

  const mainPage = document.querySelector('.main-page__body') as HTMLElement;
  for (let i = 0; i < filterArray.length; i++) {
    productCards[i].addEventListener('click', (): void => {
      mainPage.innerHTML = '';
      const itemDetails = `
        <div class="main-page__details details-page">
          <h2 class="details-page__title">${filterArray[i].title}</h2>
          <div class="details-page__body">
            <div class="details-page__images images-details">
              <div class="images-details__other-foto"></div>
              <div class="images-details__main-foto">
                <img src="${filterArray[i].images[filterArray[i].images.length - 1]}" alt="picture" />
              </div>
            </div>
            <div class="details-page__descriptions descriptions-details">
              <div class="descriptions-details__items">
                <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Description:</h3>
                  <div class="descriptions-details__text">${filterArray[i].description}</div>
                </div>
                <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Discount Percentage:</h3>
                  <div class="descriptions-details__text">${filterArray[i].discountPercentage}</div>
                </div>
                <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Rating:</h3>
                  <div class="descriptions-details__text">${filterArray[i].rating}</div>
                </div>
                <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Stock:</h3>
                  <div class="descriptions-details__text">${filterArray[i].stock}</div>
                </div>
                <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Brand:</h3>
                  <div class="descriptions-details__text">${filterArray[i].brand}</div>
                </div>
                  <div class="descriptions-details__item">
                  <h3 class="descriptions-details__title">Category:</h3>
                <div class="descriptions-details__text">${filterArray[i].category}</div>
              </div>
              </div>
            </div>
            <div class="details-page__actions actions-details">
              <div class="actions-details__cost">€ ${filterArray[i].price}</div>
              <div class="actions-details__buttons">
                <button class="actions-details__add btn-details">Add to cart</button>
                <button class="actions-details__buy btn-details buy-now">Buy now</button>
              </div>
            </div>
          </div>
        </div>
      `;
      mainPage.insertAdjacentHTML('beforeend', itemDetails);
      btnClick();
      const blockFoto = document.querySelector('.images-details__other-foto') as HTMLElement;
      const mainFoto = document.querySelector('.images-details__main-foto img') as HTMLImageElement;

      async function getImage(): Promise<void> {
        for (let j = 0; j < filterArray[i].images.length; j++) {
          const res = await fetch(filterArray[i].images[j]);
          const itemImage = `
              <div class="images-details__image">
                <img src="${res.url}" alt="picture" />
              </div>
            `;
          blockFoto.insertAdjacentHTML('beforeend', itemImage);
        }
      }
      getImage();

      blockFoto.addEventListener('click', (e: Event): void => {
        const otherFotos = document.querySelectorAll('.images-details__image img') as NodeListOf<Element>;
        for (let j = 0; j < otherFotos.length; j++) {
          const otherFoto = otherFotos[j];
          if (e.target === otherFoto) {
            const clickFoto = e.target as HTMLImageElement;
            mainFoto.src = clickFoto.src;
          }
        }
      });

      const add = document.querySelector('.actions-details__add') as HTMLElement;
      const cardHeaderTotal = document.querySelector('.cart-header__total span') as HTMLElement;
      const arrCart = JSON.parse(localStorage.getItem('arrCart')!) || [];
      let total = Number(localStorage.getItem('total')) || 0;

      if (arrCart.some((elem: Product) => elem.id === filterArray[i].id)) {
        add.innerHTML = 'Drop from cart';
      }

      add.addEventListener('click', () => {
        if (arrCart.some((elem: Product) => elem.id === filterArray[i].id)) {
        // if (arrCart.includes(filterArray[i])) {
          const a = arrCart.indexOf(filterArray[i]);
          arrCart.splice(a, 1);
          add.innerHTML = 'Add to cart';
          total -= filterArray[i].price;
          cardHeaderTotal.innerHTML = total.toString();
          removeCartCount();
          localStorage.setItem('arrCart', JSON.stringify(arrCart));
          localStorage.setItem('total', `${total}`);
        } else {
          arrCart.push(filterArray[i]);
          add.innerHTML = 'Drop from cart';
          total += filterArray[i].price;
          cardHeaderTotal.innerHTML = total.toString();
          addCartCount();
          localStorage.setItem('arrCart', JSON.stringify(arrCart));
          localStorage.setItem('total', `${total}`);
        }
      });
    });
  }
}
