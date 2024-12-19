import type { Page } from '../../types/toolkit';

export const safetyPages: Page[] = [
  {
    id: 'safety-check-1',
    title: 'Immediate Safety Considerations - 1',
    sequence: 4,
    questions: [
      {
        id: 'immediate-access',
        text: 'Does the SOC have immediate access to the means to carry out the threat?',
        description: 'Before proceeding, answer the following safety consideration questions. These questions are designed to help you determine the immediate risk level posed by the Subject of Concern (SOC). It is important to answer each question thoroughly to ensure appropriate actions are taken.',
        details: 'Consider:\n* Physical access to weapons\n* Access to materials that could be used to cause harm\n* Proximity to potential targets\n* Previous demonstrations of ability to acquire means',
        required: true,
        type: 'radio',
        options: [
          {
            id: 'yes',
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 'no',
            label: 'No',
            value: 'no'
          },
          {
            id: 'unknown',
            label: 'Unknown at this time',
            value: 'unknown'
          }
        ]
      }
    ],
    navigation: {
      back: true,
      next: true,
      alternateRoutes: []
    }
  },
  {
    id: 'safety-check-2',
    title: 'Immediate Safety Considerations - 2',
    sequence: 5,
    questions: [
      {
        id: 'rehearsal-behavior',
        text: 'Has any rehearsal behavior or planning been identified or observed?',
        details: 'Consider:\n* Evidence of planning or preparation\n* Practice runs or simulations\n* Gathering of materials or information\n* Surveillance of potential targets\n* Documentation of plans',
        required: true,
        type: 'radio',
        options: [
          {
            id: 'yes',
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 'no',
            label: 'No',
            value: 'no'
          },
          {
            id: 'unknown',
            label: 'Unknown at this time',
            value: 'unknown'
          }
        ]
      }
    ],
    navigation: {
      back: true,
      next: true,
      alternateRoutes: []
    }
  },
  {
    id: 'safety-check-3',
    title: 'Immediate Safety Considerations - 3',
    sequence: 6,
    questions: [
      {
        id: 'baseline-shift',
        text: 'Is this a shift in the SOC\'s baseline behavior?',
        details: 'Consider:\n* Changes in typical behavior patterns\n* Unusual interest in violence or weapons\n* Sudden changes in social interactions\n* Significant life changes or stressors\n* Previous patterns of concerning behavior',
        required: true,
        type: 'radio',
        options: [
          {
            id: 'yes',
            label: 'Yes',
            value: 'yes'
          },
          {
            id: 'no',
            label: 'No',
            value: 'no'
          },
          {
            id: 'unknown',
            label: 'Unknown at this time',
            value: 'unknown'
          }
        ]
      }
    ],
    navigation: {
      back: true,
      next: true,
      alternateRoutes: []
    }
  }
];
