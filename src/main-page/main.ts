//===input=range====
let rangeMins = document.querySelectorAll(
  '.multi-range__min'
) as NodeListOf<Element>;
let rangeMaxs = document.querySelectorAll(
  '.multi-range__max'
) as NodeListOf<Element>;

let valueFroms = document.querySelectorAll(
  '.range-aside__from span'
) as NodeListOf<Element>;

let valueTos = document.querySelectorAll(
  '.range-aside__to span'
) as NodeListOf<Element>;

for (let i = 0; i < rangeMins.length; i++) {
  let rangeMin = rangeMins[i] as HTMLInputElement;
  let rangeMax = rangeMaxs[i] as HTMLInputElement;
  let valueFrom = valueFroms[i];
  let valueTo = valueTos[i];

  let a = Number(valueTo.textContent);

  rangeMin.addEventListener('input', slideMin);
  rangeMax.addEventListener('input', slideMax);

  function slideMin() {
    if (parseInt(rangeMax.value) - parseInt(rangeMin.value) <= 0) {
      rangeMin.value = rangeMax.value;
    }
    valueFrom.textContent =
      String(Math.floor((a * Number(rangeMin.value)) / 100)) + '.00';
  }
  function slideMax() {
    if (parseInt(rangeMax.value) - parseInt(rangeMin.value) <= 0) {
      rangeMax.value = rangeMin.value;
    }
    valueTo.textContent =
      String(Math.floor((a * Number(rangeMax.value)) / 100)) + '.00';
  }
}

//============
