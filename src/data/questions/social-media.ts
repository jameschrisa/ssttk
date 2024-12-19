import type { Page } from '../../types/toolkit';

export const socialMediaPages: Page[] = [
  {
    id: 'google-search',
    title: 'Searching with Google',
    sequence: 9,
    questions: [
      {
        id: 'google-search-info',
        text: 'Using the search engine\'s advanced features like exact phrases, keywords, keyword ordered and freeform, excluded words, site or domain or time range.',
        description: '## Boolean Search Operators\nBoolean search operators are essential for refining and narrowing down your Google search results. These operators help you filter out irrelevant information and focus on the most pertinent data. Here are the key operators and how to use them:\n\n## Quotation Marks\nUse quotation marks around exact phrases to search for specific language or names. This ensures that Google only returns results that contain the exact words in the order you specify.\n\n### Example\n"kill people burn shit fuck school" will return results containing that exact phrase.\n\n## AND Operator\nThis operator ensures that your search results include multiple terms. Use this to combine search phrases and get results that contain all of the specified terms.\n\n### Example\n"school name" AND threat OR lockdown OR bomb OR shoot will return results containing the school name and any one of the terms \'threat\', \'lockdown\', \'bomb\', or \'shoot\'.\n\n## NOT (-) Operator\nUse this to exclude certain terms from your search results. This is useful if irrelevant data comes up in your search.\n\n### Example\n"First Last" -michigan will exclude results related to Michigan for someone with that name.\n\n## OR Operator\nThis allows for flexibility in your search by returning results that contain either one term or another.\n\n### Example\n"First Last" OR "username123" will return results for either the person\'s real name or their username.',
        details: '### Cross-Referencing Names and Usernames\nWhen conducting an inquiry on a person of concern (SOC), it\'s important to search for both their full name and any known aliases or nicknames. Consistent and exact spelling of usernames is crucial, as even small differences can lead to missing critical information.\n\n## Steps\n* Search for full names: Use the person\'s first and last name in quotes to find exact matches.\n### Example\n"John Doe" AND "City" or "John Doe" AND "School Name".\n* Search for usernames: Many people use the same username across multiple social media platforms.\n* Example: "user_name123" instagram OR tiktok OR snapchat OR twitter.\nSearch using location filters: Adding city names or locations helps to narrow down results.\n* Example: "First Last" AND "City" or "user_name123" AND "City".\n\n### Searching Anonymous Threats\nWhen dealing with an anonymous threat, the key is to search for the exact language used in the threat. Many people reuse certain phrases or copy language from other posts or forums. Use quotation marks around the exact threat to ensure you\'re getting precise results.\n\n### Example Threat Search\n"kill people burn shit fuck school" OR "shoot school name" AND threat OR lockdown OR bomb OR shoot.\n\nThis method can reveal if the language has been used before and provide insight into whether it\'s part of a larger pattern or specific incident.',
        required: false,
        type: 'info'
      },
      {
        id: 'google-search-form',
        text: 'Advanced Search Form',
        description: 'Use the form below to construct advanced Google searches. The URL will be displayed before executing the search.',
        required: false,
        type: 'google-search'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'platform-search'
        }
      ]
    }
  },
  // ... [rest of the social media pages remain unchanged]
];
