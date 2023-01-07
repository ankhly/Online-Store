import { Location } from '../types';

let storageLocationCategoriesFlag: string | null = localStorage.getItem('locationCategoriesFlag');
let locationCategoriesFlag: string | null = storageLocationCategoriesFlag || 'true';
let storageLocationBrandsFlag: string | null = localStorage.getItem('locationBrandsFlag');
let locationBrandsFlag: string | null = storageLocationBrandsFlag || 'true';

let locationStringCategories: string = localStorage.getItem('locationStringCategories') || '';
let locationStringBrands: string = localStorage.getItem('locationStringBrands') || '';
let locationStringSorts: string = localStorage.getItem('locationStringSorts') || '';
let locationStringSearch: string = localStorage.getItem('locationStringSearch') || '';
let locationStringLittleBig: string = localStorage.getItem('locationStringLittleBig') || '';
let locationStringPrice: string = localStorage.getItem('locationStringPrice') || '';
let locationStringStock: string = localStorage.getItem('locationStringStock') || '';
let locationString: string = '';

export function locationBrandsFlagTrue(): void {
  localStorage.setItem('locationBrandsFlag', 'true');
  storageLocationBrandsFlag = localStorage.getItem('locationBrandsFlag');
  locationBrandsFlag = storageLocationBrandsFlag;
}

export function locationCategoriesFlagTrue(): void {
  localStorage.setItem('locationCategoriesFlag', 'true');
  storageLocationCategoriesFlag = localStorage.getItem('locationCategoriesFlag');
  locationCategoriesFlag = storageLocationCategoriesFlag;
}

export function locationCategoriesFlagFalse(): void {
  localStorage.setItem('locationCategoriesFlag', 'false');
  storageLocationCategoriesFlag = localStorage.getItem('locationCategoriesFlag');
  locationCategoriesFlag = storageLocationCategoriesFlag;
}

export function locationBrandsFlagFalse(): void {
  localStorage.setItem('locationBrandsFlag', 'false');
  storageLocationBrandsFlag = localStorage.getItem('locationBrandsFlag');
  locationBrandsFlag = storageLocationBrandsFlag;
}

function zeroingLocationStrings(): void {
  locationStringCategories = '';
  locationStringBrands = '';
  locationStringSorts = '';
  locationStringSearch = '';
  locationStringLittleBig = '';
  locationStringPrice = '';
  locationStringStock = '';

  locationCategoriesFlagTrue();
  locationBrandsFlagTrue();

  localStorage.removeItem('locationCategoriesFlag');
  localStorage.removeItem('locationBrandsFlag');
  localStorage.removeItem('locationStringCategories');
  localStorage.removeItem('locationStringBrands');
  localStorage.removeItem('locationStringSorts');
  localStorage.removeItem('locationStringSearch');
  localStorage.removeItem('locationStringLittleBig');
  localStorage.removeItem('locationStringPrice');
  localStorage.removeItem('locationStringStock');
}

export const historyResolver = (location: string, prefix?: string, activeFlag?: boolean): void => {
  locationStringCategories = localStorage.getItem('locationStringCategories') || '';
  locationStringBrands = localStorage.getItem('locationStringBrands') || '';
  locationStringSearch = localStorage.getItem('locationStringSearch') || '';

  if (location === Location.category) {
    if (locationCategoriesFlag === 'true') {
      locationStringCategories += `&${location}=`;
      localStorage.setItem('locationCategoriesFlag', 'false');
      storageLocationCategoriesFlag = localStorage.getItem('locationCategoriesFlag');
      locationCategoriesFlag = storageLocationCategoriesFlag;
    }
    if (locationCategoriesFlag === 'false') {
      if (activeFlag) {
        locationStringCategories += `↕${prefix}`;
      } else {
        locationStringCategories = locationStringCategories.replace(`↕${prefix}`, '');
      }
    }
    if (locationStringCategories === `&${location}=`) {
      locationStringCategories = '';
      locationCategoriesFlagTrue();
    }
  }

  if (location === Location.brand) {
    if (locationBrandsFlag === 'true') {
      locationStringBrands += `&${location}=`;
      localStorage.setItem('locationBrandsFlag', 'false');
      storageLocationBrandsFlag = localStorage.getItem('locationBrandsFlag');
      locationBrandsFlag = storageLocationBrandsFlag;
    }
    if (locationBrandsFlag === 'false') {
      if (activeFlag) {
        locationStringBrands += `↕${prefix}`;
      } else {
        locationStringBrands = locationStringBrands.replace(`↕${prefix}`, '');
      }
    }
    if (locationStringBrands === `&${location}=`) {
      locationStringBrands = '';
      locationBrandsFlagTrue();
    }
  }

  if (location === Location.sort) {
    locationStringSorts = `&${location}=${prefix}`;
  }

  if (location === Location.search) {
    locationStringSearch = `&${location}=${prefix}`;
    if (locationStringSearch === `&${location}=`) {
      locationStringSearch = '';
    }
  }

  if (location === Location.littleBig) {
    locationStringLittleBig = `&${location}=${prefix}`;
  }

  if (location === Location.price) {
    locationStringPrice = `&${location}=${prefix}`;
  }

  if (location === Location.stock) {
    locationStringStock = `&${location}=${prefix}`;
  }

  localStorage.setItem('locationStringCategories', locationStringCategories);
  localStorage.setItem('locationStringBrands', locationStringBrands);
  localStorage.setItem('locationStringSorts', locationStringSorts);
  localStorage.setItem('locationStringSearch', locationStringSearch);
  localStorage.setItem('locationStringLittleBig', locationStringLittleBig);
  localStorage.setItem('locationStringPrice', locationStringPrice);
  localStorage.setItem('locationStringStock', locationStringStock);

  locationString = `/?${localStorage.getItem('locationStringCategories')}${localStorage.getItem('locationStringBrands')}${localStorage.getItem('locationStringSorts')}${localStorage.getItem('locationStringSearch')}${localStorage.getItem('locationStringLittleBig')}${localStorage.getItem('locationStringPrice')}${localStorage.getItem('locationStringStock')}`;

  if (location === Location.detail) {
    locationString = `/?${location}/${prefix}`;
    zeroingLocationStrings();
  }

  if (location === Location.cart) {
    locationString = `/?${location}`;
    zeroingLocationStrings();
  }

  if (location === Location.main) {
    locationString = `${location}`;
    zeroingLocationStrings();
  }

  window.history.pushState({}, '', locationString);
};
