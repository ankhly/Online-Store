import { productsObj } from '../data';

//const body = document.querySelector('body') as HTMLElement;

//const mainContent = `<div class="wrapper">
//<header class="header">
//	<div class="header__container container">
//		<div class="header__body">
//			<a href="" class="header__logo logo-header">
//				<div class="logo-header__icon"></div>
//				<div class="logo-header__text">Online Store</div>
//			</a>
//			<div class="header__cart cart-header">
//				<div class="cart-header__total">
//					Cart total: € <span> 0.00</span>
//				</div>
//				<div class="cart-header__icon">
//					<img src="./cart.svg" alt="" />
//					<span>0</span>
//				</div>
//			</div>
//		</div>
//	</div>
//</header>
//<main class="page">
//	<section class="page__main main-page">
//		<div class="main-page__container container">
//			<div class="main-page__body">
//				<aside class="main-page__aside aside-page">
//					<div class="aside-page__body">
//						<div class="aside-page__buttons buttons-aside">
//							<button class="buttons-aside__reset btn-aside">
//								Reset Filters
//							</button>
//							<button class="buttons-aside__copy btn-aside">
//								Copy Link
//							</button>
//						</div>
//						<div class="aside-page__category category-aside">
//							<h3 class="category-aside__title title-aside">Category</h3>
//							<div class="category-aside__items item-sort category"></div>
//						</div>
//						<div class="aside-page__brand brand-aside">
//							<h3 class="brand-aside__title title-aside">Brand</h3>
//							<div class="brand-aside__items item-sort brands"></div>
//						</div>
//						<div class="aside-page__range range-aside">
//							<h3 class="range-aside__title title-aside">Price</h3>
//							<div class="range-aside__values">
//								<div class="range-aside__from">€ <span>0.00</span></div>
//								<div class="range-aside__to">€ <span>1749.00</span></div>
//							</div>
//							<div class="range-aside__input multi-range">
//								<div class="multi-range__track"></div>
//								<input
//									type="range"
//									class="multi-range__min"
//									max="100"
//									min="0"
//									value="0"
//								/>
//								<input
//									type="range"
//									class="multi-range__max"
//									max="100"
//									min="0"
//									value="100"
//								/>
//							</div>
//						</div>
//						<div class="aside-page__range range-aside">
//							<h3 class="range-aside__title title-aside">Stock</h3>
//							<div class="range-aside__values">
//								<div class="range-aside__from"><span>0.00</span></div>
//								<div class="range-aside__to"><span>150.00</span></div>
//							</div>
//							<div class="range-aside__input multi-range">
//								<div class="multi-range__track"></div>
//								<input
//									type="range"
//									class="multi-range__min"
//									max="100"
//									min="0"
//									value="0"
//								/>
//								<input
//									type="range"
//									class="multi-range__max"
//									max="100"
//									min="0"
//									value="100"
//								/>
//							</div>
//						</div>
//					</div>
//				</aside>
//				<div class="main-page__content">
//					<div class="main-page__head head-catalog">
//						<div class="head-catalog__body">
//							<div class="head-catalog__sort sort-head">
//								<select class="sort-head__sort">
//									<option value="1" selected="selected">Sort by</option>
//									<option value="2">text1</option>
//									<option value="3">text2</option>
//									<option value="4">text3</option>
//									<option value="5">text4</option>
//									<option value="6">text5</option>
//								</select>
//							</div>
//							<div class="head-catalog__found">
//								Found: <span>100</span>
//							</div>
//							<div class="head-catalog__search search-head">
//								<input
//									type="search"
//									placeholder="Search product"
//									class="search-head__search-inp"
//								/>
//							</div>
//							<div class="head-catalog__view view-head">
//								<div class="view-head__buttons">
//									<button class="view-head__big"></button>
//									<button class="view-head__small"></button>
//								</div>
//							</div>
//						</div>
//					</div>
//					<div class="main-page__catalog item-catalog"></div>
//				</div>
//			</div>
//		</div>
//	</section>
//</main>
//<footer class="footer"></footer>
//</div>`;

//body.insertAdjacentHTML('beforeend', mainContent);

const itemCatalog = document.querySelector('.item-catalog') as HTMLElement;
const itemBrand = document.querySelector('.brands') as HTMLElement;
const itemCategory = document.querySelector('.category') as HTMLElement;

let arrBrands: string[] = [];
let arrCategory: string[] = [];
const arr = productsObj.products;

export function getContent() {
  for (let i = 0; i < arr.length; i++) {
    arrBrands.push(arr[i].brand);
    arrCategory.push(arr[i].category);
    const item = `<div class="item-catalog__item" style="background-image: url(${arr[i].thumbnail})">
	<h2 class="item-catalog__title">${arr[i].title}</h2>
	<div class="item-catalog__description description-item">
		<div class="description-item__category">
			Category: <span>${arr[i].category}</span>
		</div>
		<div class="description-item__brand">
			Brand: <span>${arr[i].brand}</span>
		</div>
		<div class="description-item__price">Price: € ${arr[i].price}</div>
		<div class="description-item__discount">
			Discount: <span>${arr[i].discountPercentage}%</span>
		</div>
		<div class="description-item__rating">
			Rating: <span>${arr[i].rating}</span>
		</div>
		<div class="description-item__stock">
			Stock: <span>${arr[i].stock}</span>
		</div>
	</div>
	<div class="item-catalog__buttons buttons-item">
		<button class="buttons-item__add btn-item">
			add to cart
		</button>
		<button  class="buttons-item__details btn-item">
			details
		</button>
	</div>
	</div>`;
    itemCatalog.insertAdjacentHTML('beforeend', item);
  }
}
getContent();

class AddItem {
  array: string[];
  constructor(array: string[]) {
    this.array = array;
  }
  sortArr() {
    this.array = this.array
      .map((e) => {
        return e[0].toLocaleUpperCase() + e.slice(1).toLowerCase();
      })
      .sort();
    return [...new Set(this.array)];
  }
  addCaterorys(aray: string[]) {
    for (let i = 0; i < aray.length; i++) {
      const item = `<div class="item-sort__item">
	<div class="item-sort__name">${aray[i]}</div>
	<div class="item-sort__amount">(5/5)</div>
</div>`;
      itemCategory.insertAdjacentHTML('beforeend', item);
    }
  }
  addBrands(aray: string[]) {
    for (let i = 0; i < aray.length; i++) {
      const item = `<div class="item-sort__item">
	<div class="item-sort__name">${aray[i]}</div>
	<div class="item-sort__amount">(1/1)</div>
</div>`;
      itemBrand.insertAdjacentHTML('beforeend', item);
    }
  }
}
const brands = new AddItem(arrBrands);
const brandsSort = brands.sortArr();
brands.addBrands(brandsSort);
const categorys = new AddItem(arrCategory);
const categorySort = categorys.sortArr();
categorys.addCaterorys(categorySort);

//======

const viewButtons = document.querySelector(
  '.view-head__buttons'
) as HTMLElement;
const viewBig = document.querySelector('.view-head__big') as HTMLElement;
const viewSmall = document.querySelector('.view-head__small') as HTMLElement;
const descriptionItems = document.querySelectorAll(
  '.description-item '
) as NodeListOf<Element>;
const pageCatalog = document.querySelector(
  '.main-page__catalog'
) as HTMLElement;
const buttonsItems = document.querySelectorAll(
  '.buttons-item'
) as NodeListOf<Element>;

viewButtons.addEventListener('click', changeBloсk);
window.addEventListener('DOMContentLoaded', changeBloсk);

function changeBloсk(e: Event) {
  for (let i = 0; i < descriptionItems.length; i++) {
    let descriptionItem = descriptionItems[i] as HTMLElement;
    let buttonsItem = buttonsItems[i] as HTMLElement;
    if (e.target) {
      if (e.target == viewBig) {
        localStorage.setItem('BigBlock', 'big');
        descriptionItem.style.display = 'none';
        buttonsItem.classList.add('column');
        pageCatalog.style.gridTemplateColumns =
          'repeat(auto-fit, minmax(160px, 1fr))';
      } else if (e.target == viewSmall) {
        localStorage.removeItem('BigBlock');
        descriptionItem.style.display = 'flex';
        buttonsItem.classList.remove('column');
        pageCatalog.style.gridTemplateColumns =
          'repeat(auto-fit, minmax(240px, 1fr))';
      }
    }
    if (localStorage.getItem('BigBlock')) {
      descriptionItem.style.display = 'none';
      buttonsItem.classList.add('column');
      pageCatalog.style.gridTemplateColumns =
        'repeat(auto-fit, minmax(160px, 1fr))';
    } else {
      descriptionItem.style.display = 'flex';
      buttonsItem.classList.remove('column');
      pageCatalog.style.gridTemplateColumns =
        'repeat(auto-fit, minmax(240px, 1fr))';
    }
  }
}

//==================
