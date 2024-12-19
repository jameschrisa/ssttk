import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface SearchParams {
  exactPhrase: string;
  anyWords: string;
  excludeWords: string;
  site: string;
}

export default function GoogleSearchForm() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    exactPhrase: '',
    anyWords: '',
    excludeWords: '',
    site: '',
  });

  const [constructedUrl, setConstructedUrl] = useState('');

  const constructSearchUrl = (params: SearchParams) => {
    let searchTerms = [];

    if (params.exactPhrase) {
      searchTerms.push(`"${params.exactPhrase}"`);
    }

    if (params.anyWords) {
      const words = params.anyWords.split(' ').join(' OR ');
      searchTerms.push(`(${words})`);
    }

    if (params.excludeWords) {
      const excluded = params.excludeWords.split(' ').map(word => `-${word}`).join(' ');
      searchTerms.push(excluded);
    }

    if (params.site) {
      searchTerms.push(`site:${params.site}`);
    }

    const searchQuery = encodeURIComponent(searchTerms.join(' '));
    return `https://www.google.com/search?q=${searchQuery}`;
  };

  const handleSearch = () => {
    const url = constructSearchUrl(searchParams);
    setConstructedUrl(url);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Exact Phrase (use quotes)
          </label>
          <Input
            placeholder='"kill people burn shit fuck school"'
            value={searchParams.exactPhrase}
            onChange={(e) => setSearchParams({ ...searchParams, exactPhrase: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Returns results containing this exact phrase
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Any of these words (OR)
          </label>
          <Input
            placeholder="threat lockdown bomb shoot"
            value={searchParams.anyWords}
            onChange={(e) => setSearchParams({ ...searchParams, anyWords: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Returns results containing any of these words
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Exclude words (-)
          </label>
          <Input
            placeholder="michigan california"
            value={searchParams.excludeWords}
            onChange={(e) => setSearchParams({ ...searchParams, excludeWords: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Excludes results containing these words
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Site or Domain
          </label>
          <Input
            placeholder="instagram.com"
            value={searchParams.site}
            onChange={(e) => setSearchParams({ ...searchParams, site: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Limit results to a specific website
          </p>
        </div>
      </div>

      {constructedUrl && (
        <div className="p-4 bg-muted rounded-lg">
          <label className="block text-sm font-medium mb-1">
            Constructed Search URL:
          </label>
          <code className="block p-2 bg-background rounded border text-sm break-all">
            {constructedUrl}
          </code>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => setSearchParams({
          exactPhrase: '',
          anyWords: '',
          excludeWords: '',
          site: ''
        })}>
          Clear Form
        </Button>
        <Button onClick={handleSearch}>
          Search Google
        </Button>
      </div>
    </div>
  );
}
