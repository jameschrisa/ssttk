import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Plus, X, Upload } from 'lucide-react';
import useStore from '../store/useStore';

interface SocialIdentity {
  username: string;
  platform: string;
  aliases?: string[];
}

interface Screenshot {
  id: string;
  url: string;
  tags: string[];
  notes: string;
  timestamp: string;
}

export default function DataCollectionManager() {
  const [socialIdentities, setSocialIdentities] = React.useState<SocialIdentity[]>([]);
  const [newUsername, setNewUsername] = React.useState('');
  const [newPlatform, setNewPlatform] = React.useState('');
  const [screenshots, setScreenshots] = React.useState<Screenshot[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const availableTags = [
    'Risk Enhancers',
    'Concerning',
    'Critical',
    'Follow-up',
    'Reviewed',
    'Archived'
  ];

  const handleAddIdentity = () => {
    if (newUsername && newPlatform) {
      setSocialIdentities([
        ...socialIdentities,
        { username: newUsername, platform: newPlatform, aliases: [] }
      ]);
      setNewUsername('');
      setNewPlatform('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newScreenshot: Screenshot = {
          id: crypto.randomUUID(),
          url: reader.result as string,
          tags: selectedTags,
          notes: notes,
          timestamp: new Date().toISOString()
        };
        setScreenshots([...screenshots, newScreenshot]);
        setSelectedTags([]);
        setNotes('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Data Collection Manager</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Social Media Identities */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Identities</CardTitle>
            <CardDescription>
              Add and manage social media usernames and aliases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Username"
                value={newUsername}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)}
              />
              <Input
                placeholder="Platform"
                value={newPlatform}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPlatform(e.target.value)}
              />
              <Button onClick={handleAddIdentity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {socialIdentities.map((identity, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                  <span className="font-medium">{identity.username}</span>
                  <span className="text-muted-foreground">on</span>
                  <span>{identity.platform}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Screenshot Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Screenshot Upload</CardTitle>
            <CardDescription>
              Upload and tag screenshots with relevant information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById('screenshot-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Screenshot
              </Button>
              <input
                id="screenshot-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => 
                      selectedTags.includes(tag) 
                        ? handleRemoveTag(tag)
                        : setSelectedTags([...selectedTags, tag])
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag"
                  value={newTag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Add notes about this screenshot..."
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Screenshots Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map(screenshot => (
          <Card key={screenshot.id}>
            <CardContent className="pt-6">
              <img
                src={screenshot.url}
                alt="Screenshot"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {screenshot.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(screenshot.timestamp).toLocaleString()}
                </p>
                {screenshot.notes && (
                  <p className="text-sm">{screenshot.notes}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
