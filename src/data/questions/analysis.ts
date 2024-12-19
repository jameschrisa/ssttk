import type { Page } from '../../types/toolkit';

export const analysisPages: Page[] = [
  {
    id: 'analyze-content',
    title: 'Analyze a Post, Account, or Content',
    sequence: 4,
    questions: [
      {
        id: 'analysis-type',
        text: 'Choose the type of analysis you want to perform:',
        required: true,
        type: 'card-selection',
        options: [
          {
            id: 'osint',
            label: 'Assess OSINT resources',
            value: 'osint',
            description: 'Analyze open-source intelligence resources and data'
          },
          {
            id: 'law-enforcement',
            label: 'Assess Law Enforcement',
            value: 'law-enforcement',
            description: 'Review and assess law enforcement-related information'
          },
          {
            id: 'behavior-shift',
            label: 'I\'ve noticed a shift in Digital Behavior Baseline',
            value: 'behavior-shift',
            description: 'Analyze changes in online behavior patterns'
          },
          {
            id: 'concerning-photo',
            label: 'I\'ve come across a concerning photo',
            value: 'concerning-photo',
            description: 'Analyze and assess potentially concerning images'
          },
          {
            id: 'threat-behavior',
            label: 'I\'ve noticed behaviors consistent with a threat',
            value: 'threat-behavior',
            description: 'Assess behaviors that may indicate potential threats'
          },
          {
            id: 'private-account',
            label: 'I\'ve come across a private account of the SoC',
            value: 'private-account',
            description: 'Review and assess private account information'
          }
        ]
      }
    ],
    navigation: {
      back: true,
      next: true,
      alternateRoutes: [
        {
          condition: 'osint',
          targetPageId: 'osint-resources'
        },
        {
          condition: 'law-enforcement',
          targetPageId: 'law-enforcement-guide'
        },
        {
          condition: 'behavior-shift',
          targetPageId: 'behavior-baseline'
        },
        {
          condition: 'concerning-photo',
          targetPageId: 'concerning-photo'
        },
        {
          condition: 'threat-behavior',
          targetPageId: 'threat-behavior'
        },
        {
          condition: 'private-account',
          targetPageId: 'private-account'
        }
      ]
    }
  },
  {
    id: 'osint-resources',
    title: 'OSINT Resources',
    sequence: 5,
    questions: [
      {
        id: 'osint-info',
        text: 'Curated lists of different OSINT tools:',
        description: `<div class="space-y-6">
          <div class="space-y-2">
            <h3 class="font-semibold text-lg">OSINT Resource Collections</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><a href="https://osintframework.com/" target="_blank" class="text-primary hover:underline">OSINT Framework</a></li>
              <li><a href="https://github.com/jivoi/awesome-osint" target="_blank" class="text-primary hover:underline">Awesome OSINT</a></li>
              <li><a href="https://inteltechniques.com/tools/" target="_blank" class="text-primary hover:underline">IntelTechniques Tools</a></li>
            </ul>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold text-lg">Great OSINT Tools</h3>
            <ul class="list-disc pl-6 space-y-2">
              <li><a href="https://whatsmyname.app" target="_blank" class="text-primary hover:underline">WhatsMyName</a> - Username Search</li>
              <li><a href="https://www.idcrawl.com/" target="_blank" class="text-primary hover:underline">IDCrawl</a> - Username Search</li>
              <li><a href="https://epieos.com/" target="_blank" class="text-primary hover:underline">Epieos</a> - Reverse Gmail and Phone Number Lookup</li>
              <li><a href="https://geospy.ai/" target="_blank" class="text-primary hover:underline">GeoSpy.ai</a> - AI Powered Photo Geolocation Search</li>
              <li><a href="https://www.spydialer.com/" target="_blank" class="text-primary hover:underline">SpyDialer</a> - Phone number lookup/hear voicemail</li>
              <li>Search By Image Chrome Extension</li>
              <li>Full Page Image Capture Chrome Extension</li>
              <li><a href="https://commentpicker.com/instagram-username.php" target="_blank" class="text-primary hover:underline">Instagram Username Tool</a> - Find Instagram userid/username by ID</li>
            </ul>
          </div>
        </div>`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        }
      ]
    }
  },
  {
    id: 'law-enforcement-guide',
    title: 'Law Enforcement Guide Access',
    sequence: 5,
    questions: [
      {
        id: 'law-enforcement-info',
        text: '',
        description: `A complete list of law enforcement guides and resources can be found on <a href="https://www.search.org/resources/isp-list/" target="_blank" class="text-primary hover:underline">https://www.search.org/resources/isp-list/</a>.

For any post that falls under exigent circumstances (where immediate action is necessary to prevent imminent harm, such as serious threats of violence, danger to public safety, or life-threatening situations), law enforcement can send an Emergency Disclosure Request to the respective social media platform.

Search.org will guide the investigating officer through the process of what to gather and what they need.`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        },
        {
          condition: 'platform',
          targetPageId: 'platform-search'
        }
      ]
    }
  },
  {
    id: 'behavior-baseline',
    title: 'Shift in Digital Behavioural Baseline',
    sequence: 5,
    questions: [
      {
        id: 'behavior-info',
        text: '',
        description: `Is this new behavior, or are we just now discovering it? If this is an established baseline, the initial level of risk may diminish, but it still requires behavioral management and modification.

Identifying Shifts in Digital Baseline: If there is a noticeable shift in the SOC's digital behavior, hypothesize whether real-world risk enhancers may have contributed to the change. Follow up with any necessary parties involved (such as family members, school staff, or peers) to gather more context and determine the next steps for intervention and management planning.

When analyzing posts, consider F.I.R. (Frequency, Intensity, Recency):

• Frequency: How often is the SOC posting? Have they shifted from sharing posts or leaving comments every few days to doing so multiple times per day? Check the date of each post or comment to track any increases in activity.

• Intensity: What is the language suggesting? Is there a noticeable shift toward more detail, grievances, or perceived injustices? Look for increases in hard language (violent or extreme statements) versus soft language. Are specific targets being identified or threats becoming more explicit?

• Recency: How long ago was the most recent concerning communication shared?`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        },
        {
          condition: 'platform',
          targetPageId: 'platform-search'
        }
      ]
    }
  },
  {
    id: 'concerning-photo',
    title: 'Concerning Photo Analysis',
    sequence: 5,
    questions: [
      {
        id: 'photo-info',
        text: '',
        description: `Consider doing a Reverse Image Search on the photo. Screenshot just the image itself, and use Google Images as well as Tineye to determine if it is Stock or Unique. Watch our Reverse Image Search Video Tutorial Here for further demonstration.

Is the image stock or unique?

• Stock: While stock images can lower our initial level of risk, context is important. What is the source of the stock image? If the stock image is concerning, consider asking the SOC why they chose to upload that photo.

• Unique: If the image does not appear on any other public website, consider the fact that the image may belong to the SOC. Several factors may influence the determination of a unique image such as:
- The image has only been passed around through group chats.
- The image has only been uploaded to private accounts.
- Some social media platforms do not allow reverse image search websites to index them.

We advise to design some strategic interview questions around these images. However, if we know the SOC has made a threat and is showcasing the means that appear to be a unique image, the most immediate risk-reducing intervention we can have is removing access to the means. Work with law enforcement so they can utilize our Search Warrant Template Language to expedite the process of a search warrant.`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        },
        {
          condition: 'platform',
          targetPageId: 'platform-search'
        }
      ]
    }
  },
  {
    id: 'threat-behavior',
    title: 'Behaviors Consistent with the Threat',
    sequence: 5,
    questions: [
      {
        id: 'threat-info',
        text: '',
        description: `If a subject of concern has access to weapons and there is evidence suggesting they may be preparing to carry out a threat, exigent circumstances may justify immediate actions to remove access to these means at various known locations. It is critical to engage with law enforcement promptly to ensure all necessary measures are taken to mitigate the risk.

Below are key actions law enforcement can assist with:

• Search the residence: If the subject of concern is suspected of keeping weapons at home, a thorough search of the residence should be conducted to secure any firearms, knives, or other potential means of harm.

• Locker searches: If the subject of concern has access to a locker (e.g., at school, a gym, or workplace), law enforcement can coordinate with the appropriate institutions to conduct a search for weapons or related materials.

• Backpack searches: Conducting a search of personal items like backpacks may uncover concealed weapons, tools, journals, or other means that could be used in carrying out a threat.

• Visual checks of vehicles: The individual may store weapons or other harmful items in their vehicle. A visual inspection of the vehicle can identify any dangerous materials or equipment that need to be removed.`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        },
        {
          condition: 'platform',
          targetPageId: 'platform-search'
        }
      ]
    }
  },
  {
    id: 'private-account',
    title: 'Private Account Analysis',
    sequence: 5,
    questions: [
      {
        id: 'private-account-info',
        text: '',
        description: `Even if an account is private, the bio can still provide valuable information. Often, students will link other social media platforms they use. The bio may also include personal details like general location or even a school acronym. These small pieces of information can help confirm if this is indeed the subject of concern.

Next, identify any close peers of the SOC and see if they are willing to answer questions about the SOC's digital behavior. Some helpful questions could include:

• 'What kind of things does ___ like to post?'
• 'What does ___ like to do online?'
• 'What type of Discord servers is ___ a part of?'`,
        required: false,
        type: 'info'
      }
    ],
    navigation: {
      back: true,
      next: false,
      alternateRoutes: [
        {
          condition: 'return',
          targetPageId: 'analyze-content'
        },
        {
          condition: 'platform',
          targetPageId: 'platform-search'
        }
      ]
    }
  }
];
