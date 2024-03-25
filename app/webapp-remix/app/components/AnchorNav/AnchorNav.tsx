import { Icons } from '@/app/components/Icons';

type AnchorNavProps = {
  anchorNavItems: { anchor: string; text: string }[];
  colorMode: 'light' | 'dark';
};

export default function AnchorNav({
  anchorNavItems,
  colorMode,
}: AnchorNavProps) {
  const textColor =
    colorMode === 'light' ? 'text-primary-bone' : 'text-primary-dark-green';

  const strokeColor =
    colorMode === 'light' ? 'stroke-primary-bone' : 'stroke-primary-dark-green';

  return (
    <ul>
      {anchorNavItems.map((navItem, index) => (
        <li
          key={index}
          className={`border-b border-primary-brown ${textColor}`}
        >
          <a
            href={`#${navItem.anchor}`}
            className="flex flex-row justify-between py-3 transition-opacity duration-300 hover:opacity-50"
          >
            <span>{navItem.text}</span>
            <Icons.ArrowDown className={`${strokeColor} w-4 md:w-5 h-auto`} />
          </a>
        </li>
      ))}
    </ul>
  );
}
