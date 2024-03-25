import React, { useEffect, useState } from 'react';

import { useAIArtStateStore } from '@/app/store/ShoeRemixStore';

import { Text } from '@/app/components/Text/Text';
import { cn } from '@reebok/frontend-components';

interface SelectableChipProps {
  label: string;
  onSelect: (selected: boolean) => void;
}

const SelectableChip: React.FC<SelectableChipProps> = ({ label, onSelect }) => {
const { promptName: currentPrompt } = useAIArtStateStore().currentPrompt;

  const [selected, setSelected] = useState(false);

  const isLabelCurrentPrompt = label === currentPrompt;

  /**
   * Check if the currentPrompt (temp) is changed
   * If the selected prompt label is same, select it orange
   * Else if another prompt is selected, deselect the other prompt not matching
   */
  useEffect(() => {
    if (isLabelCurrentPrompt) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [currentPrompt, label]);

  const handleSelect = () => {
    if (isLabelCurrentPrompt) return;
    setSelected(!selected);
    onSelect(!selected);
  };

  return (
    <div
      className={cn(
        'bg-primary-bone bg-opacity-10 px-4 py-1.5 rounded-full cursor-pointer select-none transition-colors ease-in-out',
        {
          'bg-primary-orange bg-opacity-100': selected,
        }
      )}
      onClick={handleSelect}
    >
      <Text variant="caption" className="text-primary-bone">
        {label}
      </Text>
    </div>
  );
};

export default SelectableChip;
