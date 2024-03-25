import { Button } from '@reebok/frontend-components';
import { Icons } from '@/app/components/Icons';

const socialLinks = [
  {
    url: 'https://discord.gg/',
    icon: <Icons.DiscordIcon className="w-5 h-auto" />,
  },
  {
    url: 'https://twitter.com/',
    icon: <Icons.Twitter className="w-4 h-auto" />,
  },
  {
    url: 'https://instagram.com/',
    icon: <Icons.Instagram className="w-5 h-auto" />,
  },
  {
    url: 'https://youtube.com/',
    icon: <Icons.Youtube className="w-5 h-auto" />,
  },
  {
    url: 'https://tiktok.com/',
    icon: <Icons.TikTok className="w-5 h-auto" />,
  },
];

const sharedButtonStyles = 'hover:opacity-75 transition-opacity duration-300';

export default function FooterSocials() {
  return (
    <div className="my-8 md:my-24 flex flex-row gap-3 lg:gap-4">
      {socialLinks.map((link, index) => (
        <a href={link.url} target="_blank" rel="noreferrer" key={index}>
          <Button
            variant="tertiary"
            size="icon"
            className={`w-11 h-11 bg-primary-bone ${sharedButtonStyles}`}
          >
            {link.icon}
          </Button>
        </a>
      ))}
    </div>
  );
}
