import type { Page } from '../../types/toolkit';

export const beginPages: Page[] = [
  {
    id: 'begin-digital-collection',
    title: 'Begin Digital Collection',
    sequence: 1,
    questions: [
      {
        id: 'threat-maker-type',
        text: 'Is the threat maker known or unknown?',
        description: 'A significant piece of Digital Threat Assessment is identifying if the person of concern has publicly-viewable online content consistent with the threat and/or access to weapons. To be able to determine the threat risk level, we must conduct online scans of their digital content and online footprint to inform our threat assessment.',
        details: 'Engaging in online open-source data collection utilizing social media platforms, blogs, forums, and the dark web is the best practice for establishing a digital behavioral baseline. This often provides evidence of ideation and/or the manifestation of a grievance or perceived injustice.\n\nCollecting and preserving evidence of the Subject of Concern\'s (SOC) digital baseline is key in ensuring all evidence is documented as we go. We want to ensure we save this information as you may never know when the SOC may remove a social media post.\nOnce documented, review the information in a multidisciplinary team, recognizing that the online information needs to be considered within a larger context.\n\nIt is recommended that School Safety / Threat Assessment teams use dedicated social media accounts when needed as personal accounts are never recommended.',
        required: true,
        type: 'radio',
        options: [
          {
            id: 'ktm',
            label: 'Known Threat Maker (KTM)',
            value: 'ktm'
          },
          {
            id: 'utm',
            label: 'Unknown Threat Maker (UTM)',
            value: 'utm'
          }
        ]
      }
    ],
    navigation: {
      back: false,
      next: true,
      alternateRoutes: [
        {
          condition: 'ktm',
          targetPageId: 'ktm-safety-1'
        },
        {
          condition: 'utm',
          targetPageId: 'utm-initial'
        }
      ]
    }
  }
];
