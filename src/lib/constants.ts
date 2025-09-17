import { Facebook, Instagram, type LucideIcon } from 'lucide-react';
import XIcon from '@/components/shared/icons/XIcon';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/membership', label: 'Membership' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
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
