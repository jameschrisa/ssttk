import { Page } from '../../types/toolkit';
import { beginPages } from './begin';
import { platformPages } from './platform';
import { resultPages } from './results';
import { safetyPages } from './safety';
import { socialMediaPages } from './social-media';
import { usernamePages } from './username';
import { analysisPages } from './analysis';

export const allPages: Page[] = [
  ...beginPages,
  ...platformPages,
  ...resultPages,
  ...safetyPages,
  ...socialMediaPages,
  ...usernamePages,
  ...analysisPages,
];
