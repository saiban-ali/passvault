import Dropdown, { MenuItem } from '@web/components/Dropdown';
import { BsGlobe } from 'solid-icons/bs';
import { CgTrash } from 'solid-icons/cg';
import { FiMoreVertical, FiPaperclip } from 'solid-icons/fi';
import { ImCopy, ImShare } from 'solid-icons/im';
import { IoCopyOutline } from 'solid-icons/io';
import { Component, For } from 'solid-js';

const VaultItems: Component = () => {
  return (
    <div>
      <For each={[1, 2]}>
        {() => (
          <div class="flex items-center h-14 space-x-6 px-4 text-gray-600 text-sm border-solid border-b border-b-gray-300 border-transparent">
            <input type="checkbox" class="cursor-pointer" />
            <BsGlobe size={22} />
            <div class="flex-1 text-start">
              <p class="text-blue-800/90 cursor-pointer hover:underline">
                54.225.179.213
              </p>
              <p class="text-slate-500">saiban.ali0405@gmail.com</p>
            </div>
            <Dropdown
              trigger={<FiMoreVertical size={24} class="cursor-pointer" />}
            >
              <div class="absolute z-10 top-5 right-0 w-48 bg-white border border-solid border-gray-300 rounded">
                <MenuItem title="Copy Username" icon={<IoCopyOutline />} />
                <MenuItem title="Copy Password" icon={<IoCopyOutline />} />
                <MenuItem title="Launch" icon={<ImShare />} />
                <MenuItem title="Attachment" icon={<FiPaperclip />} />
                <MenuItem title="Clone" icon={<ImCopy />} />
                <MenuItem
                  title="Delete"
                  classes="text-red-600"
                  icon={<CgTrash />}
                />
              </div>
            </Dropdown>
          </div>
        )}
      </For>
    </div>
  );
};

export default VaultItems;
