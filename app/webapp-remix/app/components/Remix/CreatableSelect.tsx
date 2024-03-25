import React, { useState, useRef, useMemo, useEffect } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useAIArtStateStore } from '@/app/store/ShoeRemixStore';

import { Icons } from '@/app/components/Icons';
import { Text } from '@/app/components/Text/Text';
import { Separator, cn } from '@reebok/frontend-components';

import CircleRightArrowGreyIcon from '@/public/images/icons/icon-rightcirclearrow-lightgrey.svg';

interface CreatableSelectProps {
  options: { promptName: string; promptId: string }[];
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({ options }) => {
  const t = useTranslations();

  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { savedPrompt, replacePrompt } = useAIArtStateStore();

  const isUserTyping = inputValue !== '' && isDropdownOpen;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
  };

  const handleClearInput = () => {
    /**
     * When a user clicks X icon:
     * Clear input field and close dropdown
     * Replace prompt with the fallback master prompt
     */
    setInputValue('');
    replacePrompt(savedPrompt);
    setDropdownOpen(false);
  };

  const handleOptionClick = (optionName: string, optionId: string) => {
    /**
     * When a dropdown prompt is clicked:
     * Clear input field
     * Replace temp prompt
     */
    const option = {
      promptName: optionName,
      promptId: optionId
    }
    setInputValue('');
    replacePrompt(option);
    setDropdownOpen(false);
  };

  const handleOnBlur = () => {
    setTimeout(() => setDropdownOpen(false), 200); // Delay closing dropdown for click events
  };

  const filteredPrompts = useMemo(() => {
    return options
      ? options.filter(
          (option) =>
            option.promptName.toLowerCase().startsWith(inputValue.toLowerCase()) &&
            option.promptName.toLowerCase().includes(inputValue.toLowerCase()) &&
            option.promptId
        )
      : [];
  }, [inputValue, options]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className={cn(
          'w-full h-12 pl-4 pr-12 focus:outline-none font-neue-plak text-sm text-primary-navy',
          {
            'rounded-t-sm': isUserTyping,
            'rounded-sm': !isUserTyping,
          }
        )}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownOpen(true)}
        onBlur={handleOnBlur}
        ref={inputRef}
        placeholder="Type something e.g Sunrise"
      />
      {inputValue ? (
        <div
          className="flex absolute inset-y-0 right-3 rounded-full w-6 h-6 justify-center items-center my-auto bg-primary-navy cursor-pointer"
          onClick={handleClearInput}
        >
          <Icons.BoneXMarkIcon />
        </div>
      ) : (
        <Image
          src={CircleRightArrowGreyIcon}
          alt="Circle Right Arrow Icon"
          className="absolute inset-y-0 w-6 h-6 my-auto text-black right-3 cursor-pointer"
        />
      )}

      {isDropdownOpen && inputValue && (
        <div className="absolute top-full left-0 w-full px-4 h-40 overflow-y-auto rounded-b bg-white text-primary-navy">
          <Separator className="w-full mb-4" />
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.promptName}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(prompt.promptName, prompt.promptId)}
            >
              <Text variant="caption" className="opacity-60">
                {prompt.promptName}
              </Text>
            </div>
          ))}
          {filteredPrompts.length === 0 && (
            <Text variant="caption" className="p-2 opacity-60">
              {t('customizer_aiart_no_styles_available')}
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatableSelect;
