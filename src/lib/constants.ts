import { Facebook, Instagram, type LucideIcon } from 'lucide-react';
import XIcon from '@/components/shared/icons/XIcon';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/launch', label: 'Launch Event' },
  { href: '/about', label: 'About Us' },
  { href: '/membership', label: 'Membership' },
  { href: '/gallery', label: 'Gallery' },
];

export const MEMBERSHIP_LINKS = [
  { href: '/membership', label: 'Membership Packages' },
  { href: '/membership/how-it-works', label: 'How It Works' },
  { href: '/membership/apply', label: 'Apply Online' },
  { href: '/membership/benefits', label: 'Member Benefits' },
  { href: '/membership/faq', label: 'FAQ' },
];

export const SOCIAL_LINKS: {
  name: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'X', href: '#', icon: XIcon },
];
