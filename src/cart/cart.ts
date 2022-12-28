import { Product } from '../types';

const arrCart: Product[] = [];

let total = 0;
let countCart = 0;

function addCartCount(): void {
  const cardIcon = document.querySelector('.cart-header__icon span') as HTMLElement;
  countCart++;
  cardIcon.innerHTML = countCart.toString();
}

function removeCartCount(): void {
  const cardIcon = document.querySelector('.cart-header__icon span') as HTMLElement;
  countCart--;
  cardIcon.innerHTML = countCart.toString();
}

export function addToCardClick(filterArray: Product[], addToCard: NodeListOf<HTMLElement>): void {
  const cardHeaderTotal = document.querySelector('.cart-header__total span') as HTMLElement;
  for (let i = 0; i < addToCard.length; i++) {
    addToCard[i].addEventListener('click', (): void => {
      if (arrCart.includes(filterArray[i])) {
        const a = arrCart.indexOf(filterArray[i]);
        arrCart.splice(a, 1);
        addToCard[i].innerHTML = 'Add to cart';
        total -= filterArray[i].price;
        cardHeaderTotal.innerHTML = total.toString();
        removeCartCount();
      } else {
        arrCart.push(filterArray[i]);
        addToCard[i].innerHTML = 'Drop from cart';
        total += filterArray[i].price;
        cardHeaderTotal.innerHTML = total.toString();
        addCartCount();
      }
    });
  }
}

export function cartBtnClick(cartBtn: HTMLElement) {
  const mainPage = document.querySelector('.main-page__body') as HTMLElement;
  const cardHeaderTotal = document.querySelector('.cart-header__total span') as HTMLElement;
  cartBtn.addEventListener('click', (): void => {
    mainPage.innerHTML = '';
    const cartContent = `
      <div class="main-page__cart cart-page">
        <div class="cart-page__products products-cart">
          <h2 class="products-cart__title">Products In Cart</h2>
          <div class="products-cart__items item-cart">
          </div>
        </div>
        <div class="cart-page__summary summary-cart">
          <h2 class="summary-cart__title">Summary</h2>
          <div class="summary-cart__products">Products: <span></span></div>
          <div class="summary-cart__total">Total: € <span></span></div>
          <input
            type="text"
            placeholder="Enter promo code"
            class="summary-cart__promo"
          />
          <button class="summary-cart__buy">Buy now</button>
        </div>
      </div>
    `;
    mainPage.insertAdjacentHTML('beforeend', cartContent);

    const itemCartBlock = document.querySelector('.item-cart') as HTMLElement;

    for (let i = 0; i < arrCart.length; i++) {
      const itemCart = `
        <div class="item-cart__item">
          <div class="item-cart__number"></div>
          <div class="item-cart__image">
            <img src="${arrCart[i].thumbnail}" alt="picture" />
          </div>
          <div class="item-cart__description description-cart">
            <h3 class="description-cart__title">${arrCart[i].title}</h3>
            <div class="description-cart__description">${arrCart[i].description}</div>
            <div class="description-cart__info">
              <div class="description-cart__rating">Rating: ${arrCart[i].rating}</div>
              <div class="description-cart__discount">Discount: ${arrCart[i].discountPercentage}</div>
            </div>
          </div>
          <div class="item-cart__control control-cart">
            <div class="control-cart__stock">Stock: ${arrCart[i].stock}</div>
            <div class="control-cart__amount">
              <button class="control-cart__minus"></button>
              <div class="control-cart__count">1</div>
              <button class="control-cart__plus">+</button>
            </div>
            <div class="control-cart__price">€ <span>${arrCart[i].price}</span></div>
          </div>
        </div>
      `;
      itemCartBlock.insertAdjacentHTML('beforeend', itemCart);
    }

    function numCart(): void {
      const num = document.querySelectorAll('.item-cart__number') as NodeListOf<Element>;
      const title = document.querySelector('.products-cart__title') as HTMLElement;
      const summaryProducts = document.querySelector('.summary-cart__products span') as HTMLElement;

      summaryProducts.innerHTML = num.length.toString();

      for (let i = 0; i < num.length; i++) {
        num[i].innerHTML = (i + 1).toString();
      }
      if (num.length === 0) {
        title.innerHTML = 'Cart is Empty';
      }
    }
    numCart();

    const cartItem = document.querySelectorAll('.item-cart__item') as NodeListOf<Element>;
    const plus = document.querySelectorAll('.control-cart__plus') as NodeListOf<Element>;
    const minus = document.querySelectorAll('.control-cart__minus') as NodeListOf<Element>;
    const cartCount = document.querySelectorAll('.control-cart__count') as NodeListOf<Element>;
    const cartPrice = document.querySelectorAll('.control-cart__price span') as NodeListOf<Element>;
    const sumTotal = document.querySelector('.summary-cart__total span') as HTMLElement;

    for (let i = 0; i < cartItem.length; i++) {
      cartItem[i].addEventListener('click', amount);
      let count = parseInt(cartCount[i].innerHTML, 10);

      function amount(e: Event): void {
        if (e.target == plus[i]) {
          count++;
          cartCount[i].innerHTML = count.toString();
          total += parseInt(cartPrice[i].innerHTML);
          totalCart(total);
        }
        if (e.target == minus[i]) {
          if (parseInt(cartCount[i].innerHTML, 10) > 1) {
            count--;
            cartCount[i].innerHTML = count.toString();
            total -= parseInt(cartPrice[i].innerHTML, 10);
            totalCart(total);
          } else if (parseInt(cartCount[i].innerHTML, 10) === 1) {
            cartItem[i].remove();
            removeCartCount();
            numCart();
            total -= parseInt(cartPrice[i].innerHTML, 10);
            totalCart(total);
          }
        }
      }
    }
    totalCart(total);
    function totalCart(sum: number): void {
      sumTotal.innerHTML = sum.toString();
      cardHeaderTotal.innerHTML = sum.toString();
    }
  });
}
