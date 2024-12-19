import type { Page } from '../../types/toolkit';

export const usernamePages: Page[] = [
  {
    id: 'username-input',
    title: 'Enter User Names',
    sequence: 8,
    questions: [
      {
        id: 'username',
        text: 'Enter the username(s) you want to search for',
        description: 'Enter one or more usernames to search across social media platforms. You can also analyze content you\'ve already found.',
        required: true,
        type: 'username-input'
      },
      {
        id: 'analyze-link',
        text: 'Already have content to analyze?',
        description: 'If you\'ve already found content that needs analysis, you can proceed directly to content analysis.',
        required: false,
        type: 'card-selection',
        options: [
          {
            id: 'analyze',
            label: 'Analyze content already found',
            value: 'analyze',
            description: 'Analyze posts, accounts, or content you\'ve already discovered'
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
          targetPageId: 'platform-search'
        },
        {
          condition: 'analyze',
          targetPageId: 'analyze-content'
        }
      ]
    }
  }
];
