function slideMin(rangeMax: HTMLInputElement, rangeMin: HTMLInputElement, valueFrom: Element, a: number): void {
  if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
    rangeMin.value = rangeMax.value;
  }
  valueFrom.textContent = `${String(Math.floor((a * Number(rangeMin.value)) / 100))}.00`;
}

function slideMax(rangeMax: HTMLInputElement, rangeMin: HTMLInputElement, valueTo: Element, a: number) {
  if (parseInt(rangeMax.value, 10) - parseInt(rangeMin.value, 10) <= 0) {
    rangeMax.value = rangeMin.value;
  }
  valueTo.textContent = `${String(Math.floor((a * Number(rangeMax.value)) / 100))}.00`;
}

export function rangeMinMaxInput(
  rangeMins: NodeListOf<HTMLInputElement>,
  rangeMaxs: NodeListOf<HTMLInputElement>,
  valueFroms: NodeListOf<Element>,
  valueTos: NodeListOf<Element>,
): void {
  for (let i = 0; i < rangeMins.length; i++) {
    const rangeMin = rangeMins[i] as HTMLInputElement;
    const rangeMax = rangeMaxs[i] as HTMLInputElement;
    const valueFrom = valueFroms[i];
    const valueTo = valueTos[i];
    const a = Number(valueTo.textContent);

    rangeMin.addEventListener('input', (): void => {
      slideMin(rangeMax, rangeMin, valueFrom, a);
    });
    rangeMax.addEventListener('input', (): void => {
      slideMax(rangeMax, rangeMin, valueTo, a);
    });
  }
}
