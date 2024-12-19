import { ChevronRight } from 'lucide-react';
import { allPages } from '../data/questions';
import { Page } from '../types/toolkit';

interface BreadcrumbProps {
  currentPageId: string;
}

export default function Breadcrumb({ currentPageId }: BreadcrumbProps) {
  // Find current page
  const currentPage = allPages.find(page => page.id === currentPageId);
  if (!currentPage) return null;

  // Get the section title based on page ID
  function getSectionTitle(page: Page) {
    switch (page.id) {
      case 'welcome':
      case 'terms':
        return 'Start';
      case 'platform-search':
        return 'Platform Selection';
      case 'google-search':
        return 'Search';
      default:
        return page.title;
    }
  }

  // Build breadcrumb path based on the current flow
  function getBreadcrumbPath(currentPage: Page): Page[] {
    const path: Page[] = [];
    
    // Always start with welcome page
    const welcomePage = allPages.find(p => p.id === 'welcome');
    if (welcomePage) path.push(welcomePage);

    // Add platform selection for search pages
    if (currentPage.id === 'platform-search' || currentPage.id === 'google-search') {
      const platformPage = allPages.find(p => p.id === 'platform-search');
      if (platformPage) path.push(platformPage);
    }

    // Add current page if it's different from the previous ones
    if (!path.find(p => p.id === currentPage.id)) {
      path.push(currentPage);
    }

    return path;
  }

  const breadcrumbPath = getBreadcrumbPath(currentPage);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      {breadcrumbPath.map((page, index) => {
        const isLast = index === breadcrumbPath.length - 1;
        const sectionTitle = getSectionTitle(page);
        
        return (
          <div key={page.id} className="flex items-center">
            <span 
              className={`${
                isLast 
                  ? 'font-semibold text-foreground' 
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }`}
            >
              {sectionTitle}
            </span>
            {!isLast && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
