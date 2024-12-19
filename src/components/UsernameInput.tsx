import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface UsernameInputProps {
  value: { usernames: string[]; notes: string } | undefined;
  onChange: (value: { usernames: string[]; notes: string }) => void;
}

export default function UsernameInput({ value = { usernames: [], notes: '' }, onChange }: UsernameInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addUsernames(inputValue);
    }
  };

  const addUsernames = (input: string) => {
    const newUsernames = input
      .split(',')
      .map(username => username.trim())
      .filter(username => username && !value.usernames.includes(username));

    if (newUsernames.length > 0) {
      onChange({
        ...value,
        usernames: [...value.usernames, ...newUsernames]
      });
      setInputValue('');
    }
  };

  const removeUsername = (username: string) => {
    onChange({
      ...value,
      usernames: value.usernames.filter(u => u !== username)
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...value,
      notes: e.target.value
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Enter username(s)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1"
          />
          <Button
            onClick={() => {
              if (inputValue.trim()) {
                addUsernames(inputValue);
              }
            }}
            type="button"
          >
            Add
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Press Enter or click Add to add username. Use commas to add multiple usernames at once.
        </p>
      </div>

      {value.usernames.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.usernames.map((username) => (
            <Badge
              key={username}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {username}
              <button
                onClick={() => removeUsername(username)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Textarea
          placeholder="Enter any notes about the usernames or case..."
          value={value.notes}
          onChange={handleNotesChange}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
