import type { Page } from '../../types/toolkit';

export const resultPages: Page[] = [
  {
    id: 'safety-check-result',
    title: 'Safety Check Result',
    sequence: 7,
    questions: [
      {
        id: 'safety-result',
        text: 'Based on your responses to the safety considerations, there appears to be no immediate danger. Please continue with the assessment.',
        description: 'If any access to the means are identified, please stop use of the tool immediately and ensure the safety and wellbeing of all those involved.',
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      exit: true,
      alternateRoutes: [
        {
          condition: 'continue',
          targetPageId: 'ktm-username'
        },
        {
          condition: 'exit',
          targetPageId: 'welcome'
        }
      ]
    }
  }
];
