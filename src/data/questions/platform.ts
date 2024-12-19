import type { Page } from '../../types/toolkit';

export const platformPages: Page[] = [
  {
    id: 'platform-search',
    title: 'Choose Platform or Action',
    sequence: 3,
    questions: [
      {
        id: 'platform-choice',
        text: 'Select the social media platform to begin your search or choose another action',
        required: true,
        type: 'radio',
        options: [
          {
            id: 'google',
            label: 'Google Search',
            value: 'google'
          },
          {
            id: 'snapchat',
            label: 'Snapchat',
            value: 'snapchat'
          },
          {
            id: 'instagram',
            label: 'Instagram',
            value: 'instagram'
          },
          {
            id: 'youtube',
            label: 'YouTube',
            value: 'youtube'
          },
          {
            id: 'facebook',
            label: 'Facebook',
            value: 'facebook'
          },
          {
            id: 'twitter',
            label: 'X/Twitter',
            value: 'twitter'
          },
          {
            id: 'tiktok',
            label: 'TikTok',
            value: 'tiktok'
          },
          {
            id: 'discord',
            label: 'Discord',
            value: 'discord'
          },
          {
            id: 'other',
            label: 'Other Social Media Platforms',
            value: 'other'
          }
        ]
      }
    ],
    navigation: {
      back: true,
      next: true,
      alternateRoutes: [
        {
          condition: 'continue',
          targetPageId: 'google-search'
        }
      ]
    }
  }
];
