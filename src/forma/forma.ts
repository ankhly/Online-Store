/* eslint-disable max-len */
const formaHtml = `<div class="main-page__forma forma-page">
<form class="forma-page__body">
  <div class="forma-page__details input">
    <h2 class="input__title title-popup">Personal details</h2>
    <input type="text" name="" placeholder="Name" class="input__name inp">
    <div class="error"></div>
    <input type="text" name="" placeholder="Phone number" class="input__phone inp">
    <div class="error"></div>
    <input type="text" name="" placeholder="Delivery address" class="input__address inp">
    <div class="error"></div>
    <input type="text" name="" placeholder="E-mail" class="input__email inp">
    <div class="error"></div>
  </div>
  <div class="forma-page__credit card">
    <h2 class="card__title title-popup">Credit card details</h2>
    <div class="card__details">
      <div class="card__pay-card">
      <div class="card__system-label"></div>
        <input type="text" name="" placeholder="Card number" class="card__number inp">
        <div class="error"></div>
      </div>
      <div class="card__data">
        <div class="card__date">
          <div class="card__label">VALID:</div>
          <input type="text" name="" placeholder="Valid Thru" class="card__valid inp">
          <div class="error"></div>
        </div>
        <div class="card__code">
          <div class="card__label">CVV:</div>
          <input type="text" name="" placeholder="Code" class="card__cvv inp">
          <div class="error"></div>
        </div>
      </div>
    </div>
  </div>
  <button type="submit" class="forma-page__btn">Confirm</button>
</form>
</div>`;

const validateInput = (nameInput:HTMLInputElement, funValidate: { (array: string[]): boolean; }):void => {
  const arr:Array<string> = [];
  arr.push(nameInput.value);
  if (funValidate(arr.join('').split(' '))) {
    nameInput.classList.add('true');
  } else {
    nameInput.classList.remove('true');
  }
};

const validateName = (array:Array<string>):boolean => {
  const res = Number(array.filter((e) => e.length >= 3).length);
  return res >= 2;
};
const validateAdress = (array:Array<string>):boolean => {
  const res = Number(array.filter((e) => e.length >= 5).length);
  return res >= 3;
};
const validatePhone = (array:Array<string>):boolean => {
  const num = array.join('').split('');
  if (num[0] === '+' && num.length >= 10) {
    return true;
  }
  return false;
};
const validateEmail = (array:Array<string>) => {
  const emailTest = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/iu;
  return emailTest.test(array.join(''));
};
const validateECardNumber = (array:Array<string>) => {
  const label = document.querySelector('.card__system-label') as HTMLElement;
  function labelStyle(url:string):void {
    label.style.backgroundImage = url;
    label.style.backgroundPosition = 'center';
    label.style.backgroundSize = 'contain';
    label.style.backgroundRepeat = 'no-repeat';
  }
  const ar = array.join('').split('');
  if (ar.length === 16) {
    return true;
  }
  if (ar[0] === '4') {
    labelStyle('url(../visa.svg');
  } else if (ar[0] === '5') {
    labelStyle('url(../mastercard.svg)');
  } else if (ar[0] === '6') {
    labelStyle('url(../belkart.png)');
  } else {
    label.style.background = 'rgb(232, 227, 227)';
  }
  if (ar[0] === '') {
    label.style.background = 'rgb(232, 227, 227)';
  }
  return false;
};
const validateCvv = (array:Array<string>) => array.join('').split('').length === 3;

const validateValid = (array:Array<string>) => {
  const arr = array.join('').split('\\');
  const year = String(new Date().getFullYear()).split('').splice(2, 4).join('');
  const mon = new Date().getMonth() + 1;
  if (arr[0].length === 2 && Number(arr[0]) <= 12 && array.join('').length === 5 && arr[1] >= year && Number(arr[0]) >= mon) {
    return true;
  }
  return false;
};

export function btnClick():void {
  const mainPage = document.querySelector('.main-page__body') as HTMLElement;
  const buyBtn = document.querySelector('.buy-now') as HTMLElement;
  const wrapper = document.querySelector('.wrapper') as HTMLElement;

  document.addEventListener('click', (e:Event):void => {
    if (e.target === buyBtn) {
      mainPage.insertAdjacentHTML('beforeend', formaHtml);
      wrapper.classList.add('bg');
      const form = document.querySelector('.forma-page__body') as HTMLFormElement;
      if (form) {
        const inputs = document.querySelectorAll('.inp') as NodeListOf<Element>;
        const inputName = document.querySelector('.input__name') as HTMLInputElement;
        const inputPhone = document.querySelector('.input__phone') as HTMLInputElement;
        const inputAddress = document.querySelector('.input__address') as HTMLInputElement;
        const inputEmail = document.querySelector('.input__email') as HTMLInputElement;
        const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
        const cardValid = document.querySelector('.card__valid') as HTMLInputElement;
        const cardCvv = document.querySelector('.card__cvv') as HTMLInputElement;
        const error = document.querySelectorAll('.error') as NodeListOf<Element>;

        document.addEventListener('input', (k:Event):void => {
          if (k.target === inputName) {
            validateInput(inputName, validateName);
          }
          if (k.target === inputPhone) {
            inputPhone.value = inputPhone.value.replace(/[^0-9+]/, '');
            validateInput(inputPhone, validatePhone);
          }
          if (k.target === inputAddress) {
            validateInput(inputAddress, validateAdress);
          }
          if (k.target === inputEmail) {
            validateInput(inputEmail, validateEmail);
          }
          if (k.target === cardNumber) {
            cardNumber.maxLength = 16;
            cardNumber.value = cardNumber.value.replace(/[^0-9]/, '');
            validateInput(cardNumber, validateECardNumber);
          }
          if (k.target === cardValid) {
            cardValid.maxLength = 5;
            cardValid.value = cardValid.value.replace(/[^0-9]/, '');
            cardValid.value = String(cardValid.value.match(/.{1,2}/g)?.join('\\'));
            if (cardValid.value === 'undefined') {
              cardValid.value = '';
            }
            validateInput(cardValid, validateValid);
          }
          if (k.target === cardCvv) {
            cardCvv.maxLength = 3;
            cardCvv.value = cardCvv.value.replace(/[^0-9]/, '');
            validateInput(cardCvv, validateCvv);
          }
          function erInp():void {
            for (let i = 0; i < inputs.length; i++) {
              if (inputs[i].classList.contains('true')) {
                error[i].innerHTML = '';
              }
            }
          }
          erInp();
        });

        form.addEventListener('submit', (l):void => {
          l.preventDefault();
          const sub = [];
          for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].classList.contains('true')) {
              error[i].innerHTML = 'Error';
            }
            if (inputs[i].classList.contains('true')) {
              sub.push(inputs[i]);
            }
          }
          if (sub.length === 7) {
            form.submit();
          }
        });
      }
    }
    if (e.target === wrapper) {
      const formaPage = document.querySelector('.forma-page') as HTMLElement;
      wrapper.classList.remove('bg');
      formaPage.remove();
    }
  });
}
