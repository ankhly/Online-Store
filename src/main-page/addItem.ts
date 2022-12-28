export class AddItem {
  array: string[];
  constructor(array: string[]) {
    this.array = array;
  }

  sortArr(): string[] {
    this.array = this.array
      .map((e: string) => e[0].toLocaleUpperCase() + e.slice(1).toLowerCase())
      .sort();
    return [...new Set(this.array)];
  }

  // eslint-disable-next-line class-methods-use-this
  addCategories(array: string[], node: HTMLElement): void {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item category" data-category='${array[i]
          .toLowerCase()
          .replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount">(5/5)</div>
        </div>
      `;
      node.insertAdjacentHTML('beforeend', item);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addBrands(array: string[], node: HTMLElement): void {
    for (let i = 0; i < array.length; i++) {
      const item = `
        <div class="item-sort__item brand" data-brand='${array[i]
          .toLowerCase()
          .replace(/\s/g, '')}'>
          <div class="item-sort__name">${array[i]}</div>
          <div class="item-sort__amount">(1/1)</div>
        </div>
      `;
      node.insertAdjacentHTML('beforeend', item);
    }
  }
}
