import { Location } from '../../../../RSSchool - Online-Store/Online-Store/src/types';

let storageLocationCategoriesFlag: string | null = localStorage.getItem('locationCategoriesFlag');
let locationCategoriesFlag: string | null = storageLocationCategoriesFlag || 'true';
let storageLocationBrandsFlag: string | null = localStorage.getItem('locationCategoriesFlag');
let locationBrandsFlag: string | null = storageLocationBrandsFlag || 'true';

let locationStringCategories: string = localStorage.getItem('locationStringCategories') || '';
let locationStringBrands: string = localStorage.getItem('locationStringBrands') || '';
let locationStringSorts: string = localStorage.getItem('locationStringSorts') || '';
let locationStringSearch: string = localStorage.getItem('locationStringSearch') || '';
let locationStringLittleBig: string = localStorage.getItem('locationStringLittleBig') || '';
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

// Возваращаю в false (Если все active)
export function locationCategoriesFlagFalse(): void {
  localStorage.setItem('locationCategoriesFlag', 'false');
  storageLocationCategoriesFlag = localStorage.getItem('locationCategoriesFlag');
  locationCategoriesFlag = storageLocationCategoriesFlag;
}

// Возваращаю в false (Если все active)
export function locationBrandsFlagFalse(): void {
  localStorage.setItem('locationBrandsFlag', 'false');
  storageLocationBrandsFlag = localStorage.getItem('locationBrandsFlag');
  locationBrandsFlag = storageLocationBrandsFlag;
}

// Возможно только для main.
function zeroingLocationStrings(): void {
  locationStringCategories = '';
  locationStringBrands = '';
  locationStringSorts = '';
  locationStringSearch = '';
  locationStringLittleBig = '';

  locationCategoriesFlagTrue();
  locationBrandsFlagTrue();

  localStorage.clear();
}

export const historyResolver = (location: string, prefix?: string, activeFlag?: boolean): void => {
  locationStringCategories = localStorage.getItem('locationStringCategories') || '';
  locationStringBrands = localStorage.getItem('locationStringBrands') || '';
  locationStringSorts = localStorage.getItem('locationStringSorts') || '';
  locationStringSearch = localStorage.getItem('locationStringSearch') || '';
  locationStringLittleBig = localStorage.getItem('locationStringLittleBig') || '';

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

  localStorage.setItem('locationStringCategories', locationStringCategories);
  localStorage.setItem('locationStringBrands', locationStringBrands);
  localStorage.setItem('locationStringSorts', locationStringSorts);
  localStorage.setItem('locationStringSearch', locationStringSearch);
  localStorage.setItem('locationStringLittleBig', locationStringLittleBig);

  // Возможно можно написать условие при котором будет меняться порядок (Сложно);
  locationString = `/?${localStorage.getItem('locationStringCategories')}${localStorage.getItem('locationStringBrands')}${localStorage.getItem('locationStringSorts')}${localStorage.getItem('locationStringSearch')}${localStorage.getItem('locationStringLittleBig')}`;

  if (location === Location.detail) {
    locationString = `/?${location}/${prefix}`;
    zeroingLocationStrings();
  }

  if (location === Location.cart) {
    locationString = `/${location}`;
    zeroingLocationStrings();
  }

  if (location === Location.main) {
    locationString = `${location}`;
    zeroingLocationStrings();
  }

  window.history.pushState({}, '', locationString);
};
