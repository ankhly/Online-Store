import { productsObj } from '../data';
import { getContent } from '../main-page/content';

//const itemDetails = `<div class="main-page__details details-page">
//<h2 class="details-page__title"></h2>
//<div class="details-page__body">
//	<div class="details-page__images images-details">
//		<div class="images-details__other-foto other-foto">
//			<div class="other-foto__image">
//				<img src="" alt="" />
//			</div>
//		</div>
//		<div class="images-details__main-foto">
//			<img src="" alt="" />
//		</div>
//	</div>
//	<div class="details-page__descriptions descriptions-details">
//		<div class="descriptions-details__items">
//			<div class="descriptions-details__item">
//				<h3 class="descriptions-details__title"></h3>
//				<div class="descriptions-details__text"></div>
//			</div>
//		</div>
//	</div>
//	<div class="details-page__actions actions-details">
//		<div class="actions-details__cost"></div>
//		<div class="actions-details__buttons">
//			<button class="actions-details__add btn-details"></button>
//			<button class="actions-details__buy btn-details"></button>
//		</div>
//	</div>
//</div>
//</div>`;

const mainPage = document.querySelector('.main-page__body') as HTMLBRElement;
const btnDetails = document.querySelectorAll(
  '.buttons-item'
) as NodeListOf<Element>;

const arrr = productsObj.products;

//for (let i = 0; i < btnDetails.length; i++) {
//  let btnDetail = btnDetails[i] as HTMLBRElement;
//  btnDetail.addEventListener('click', details);

//  function details(e: Event) {
//    console.log(arrr[i]);
//  }
//}

window.addEventListener('hashchange', funHash);

function funHash() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    //details();
  }
  if (hash == '') {
    //console.log(getContent());
    //getContent();
  }
}

function details() {
  //mainPage.innerHTML = '';
}

for (let i = 0; i < btnDetails.length; i++) {
  let btnDetail = btnDetails[i] as HTMLBRElement;
  btnDetail.addEventListener('click', detailsClick);

  function detailsClick(e: Event) {
    mainPage.innerHTML = '';
    console.log(arrr[i]);
    const itemDetails = `<div class="main-page__details details-page">
<h2 class="details-page__title">${arrr[i].title}</h2>
<div class="details-page__body">
	<div class="details-page__images images-details">
		<div class="images-details__other-foto other-foto">
			<div class="other-foto__image">
				<img src="${arrr[i].thumbnail}" alt="" />
			</div>
		</div>
		<div class="images-details__main-foto">
			<img src="${arrr[i].images[0]}" alt="" />
		</div>
	</div>
	<div class="details-page__descriptions descriptions-details">
		<div class="descriptions-details__items">
			<div class="descriptions-details__item">
				<h3 class="descriptions-details__title"></h3>
				<div class="descriptions-details__text"></div>
			</div>
		</div>
	</div>
	<div class="details-page__actions actions-details">
		<div class="actions-details__cost">${arrr[i].price}</div>
		<div class="actions-details__buttons">
			<button class="actions-details__add btn-details"></button>
			<button class="actions-details__buy btn-details"></button>
		</div>
	</div>
</div>
</div>`;
    mainPage.insertAdjacentHTML('beforeend', itemDetails);
  }
}
