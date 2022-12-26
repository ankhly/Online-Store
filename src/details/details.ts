import { arr } from '../main-page/content';
import { mainPage } from '../utilities/nodes';

export function productCardsDetails(
  productCards: NodeListOf<HTMLElement>
): void {
  for (let i = 0; i < productCards.length; i++) {
    const index: number = Number(productCards[i].dataset.id) - 1;

    productCards[i].addEventListener('click', (): void => {
      mainPage.innerHTML = '';
      const itemDetails = `<div class="main-page__details details-page">
			<h2 class="details-page__title">${arr[index].title}</h2>
			<div class="details-page__body">
				<div class="details-page__images images-details">
					<div class="images-details__other-foto">
			
					</div>
					<div class="images-details__main-foto">
						<img src="${arr[index].images[arr[index].images.length - 1]}" alt="" />
					</div>
				</div>
				<div class="details-page__descriptions descriptions-details">
					<div class="descriptions-details__items">
				    <div class="descriptions-details__item">
				    	<h3 class="descriptions-details__title">Description:</h3>
				    	<div class="descriptions-details__text">${arr[index].description}</div>
				    </div>
				    <div class="descriptions-details__item">
				      <h3 class="descriptions-details__title">Discount Percentage:</h3>
				      <div class="descriptions-details__text">${
                arr[index].discountPercentage
              }</div>
				    </div>
				    <div class="descriptions-details__item">
				      <h3 class="descriptions-details__title">Rating:</h3>
				      <div class="descriptions-details__text">${arr[index].rating}</div>
				    </div>
			      <div class="descriptions-details__item">
			        <h3 class="descriptions-details__title">Stock:</h3>
			        <div class="descriptions-details__text">${arr[index].stock}</div>
			      </div>
		        <div class="descriptions-details__item">
		          <h3 class="descriptions-details__title">Brand:</h3>
		          <div class="descriptions-details__text">${arr[index].brand}</div>
		        </div>
	        	  <div class="descriptions-details__item">
	        	  <h3 class="descriptions-details__title">Category:</h3>
	        	<div class="descriptions-details__text">${arr[index].category}</div>
	        </div>
					</div>
				</div>
				<div class="details-page__actions actions-details">
					<div class="actions-details__cost">€ ${arr[index].price}</div>
					<div class="actions-details__buttons">
						<button class="actions-details__add btn-details">Add to cart</button>
						<button class="actions-details__buy btn-details">Buy now</button>
					</div>
				</div>
			</div>
			</div>`;
      mainPage.insertAdjacentHTML('beforeend', itemDetails);

      const blockFoto = document.querySelector(
        '.images-details__other-foto'
      ) as HTMLElement;
      const mainFoto = document.querySelector(
        '.images-details__main-foto img'
      ) as HTMLImageElement;

      async function getImage(): Promise<void> {
        try {
          for (let i = 0; i < arr[index].images.length; i++) {
            const res = await fetch(arr[index].images[i]);
            const itemImage = `	<div class="images-details__image">
            						<img src="${res.url}" alt="" />
            						 </div>`;
            blockFoto.insertAdjacentHTML('beforeend', itemImage);
          }
        } catch {
          console.log('error');
        }
      }
      getImage();

      blockFoto.addEventListener('click', (e: Event): void => {
        const otherFotos = document.querySelectorAll(
          '.images-details__image img'
        ) as NodeListOf<Element>;
        for (let i = 0; i < otherFotos.length; i++) {
          let otherFoto = otherFotos[i];
          if (e.target == otherFoto) {
            const clickFoto = e.target as HTMLImageElement;
            mainFoto.src = clickFoto.src;
          }
        }
      });
    });
  }
}
