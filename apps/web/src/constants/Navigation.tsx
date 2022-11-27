import {
  AiOutlineCreditCard,
  AiOutlineIdcard,
  AiOutlineStar,
} from 'solid-icons/ai';
import { BsGlobe2 } from 'solid-icons/bs';
import { CgMenuGridR, CgTrash } from 'solid-icons/cg';
import { FaRegularNoteSticky } from 'solid-icons/fa';
import { SidebarSection } from '../layouts/SidebarLayout/Sidebar';

export const vaultSidebarSections: SidebarSection[] = [
  {
    items: [
      {
        title: 'All Items',
        icon: <CgMenuGridR />,
        onClick: () => {
          return;
        },
      },
      {
        title: 'Favorites',
        icon: <AiOutlineStar />,
        onClick: () => {
          return;
        },
      },
      {
        title: 'Trash',
        icon: <CgTrash />,
        onClick: () => {
          return;
        },
      },
    ],
  },
  {
    headerTitle: 'TYPES',
    showHeader: true,
    items: [
      {
        title: 'Login',
        icon: <BsGlobe2 />,
        onClick: () => {
          return;
        },
      },
      {
        title: 'Cards',
        icon: <AiOutlineCreditCard />,
        onClick: () => {
          return;
        },
      },
      {
        title: 'Identity',
        icon: <AiOutlineIdcard />,
        onClick: () => {
          return;
        },
      },
      {
        title: 'Secure Notes',
        icon: <FaRegularNoteSticky />,
        onClick: () => {
          return;
        },
      },
    ],
  },
];
