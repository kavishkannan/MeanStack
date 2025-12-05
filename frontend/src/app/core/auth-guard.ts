import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // SSR safety
  if (!isPlatformBrowser(platformId)) {
    return true; // allow SSR to render without errors
  }

  const token = localStorage.getItem('token');

  if (token) return true;

  router.navigate(['/login']);
  return false;
};
