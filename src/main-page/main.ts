//= ==input=range====
const rangeMins = document.querySelectorAll('.multi-range__min') as NodeListOf<Element>;
const rangeMaxs = document.querySelectorAll('.multi-range__max') as NodeListOf<Element>;
const valueFroms = document.querySelectorAll('.range-aside__from span') as NodeListOf<Element>;
const valueTos = document.querySelectorAll('.range-aside__to span') as NodeListOf<Element>;

for (let i = 0; i < rangeMins.length; i++) {
  const rangeMin = rangeMins[i] as HTMLInputElement;
  const rangeMax = rangeMaxs[i] as HTMLInputElement;
  const valueFrom = valueFroms[i];
  const valueTo = valueTos[i];

  const a = Number(valueTo.textContent);

  // eslint-disable-next-line no-inner-declarations
  function slideMin() {
    if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
      rangeMin.value = rangeMax.value;
    }
    valueFrom.textContent = `${String(Math.floor((a * Number(rangeMin.value)) / 100))}.00`;
  }

  // eslint-disable-next-line no-inner-declarations
  function slideMax() {
    if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
      rangeMax.value = rangeMin.value;
    }
    valueTo.textContent = `${String(Math.floor((a * Number(rangeMax.value)) / 100))}.00`;
  }

  rangeMin.addEventListener('input', slideMin);
  rangeMax.addEventListener('input', slideMax);
}

//= ===========
