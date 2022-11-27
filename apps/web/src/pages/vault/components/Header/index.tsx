import Divider from '@web/components/Divider';
import Dropdown, { MenuItem } from '@web/components/Dropdown';
import {
  AiFillCaretDown,
  AiOutlineCheckSquare,
  AiOutlineFolder,
  AiOutlineMinusSquare,
  AiOutlinePlus,
  AiOutlineSetting,
} from 'solid-icons/ai';
import { CgTrash } from 'solid-icons/cg';
import { Component, createSignal } from 'solid-js';
import AddItemModal from '../AddItemModal';

const Header: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const onAddItemClick = () => {
    console.log('onAddItemClick');
    setIsOpen(true);
  };

  return (
    <div class="flex justify-between pb-2 border-solid border-b border-b-gray-300 border-transparent">
      <span class="text-2xl text-slate-800">Vault Items</span>
      <div class="flex space-x-2">
        <Dropdown
          trigger={
            <button class="bg-white border-gray-300 font-semibold text-blue-800/90 py-1.5 px-2 rounded border-solid border hover:bg-blue-700/90 hover:text-white cursor-pointer">
              <span class="flex space-x-1 justify-center items-center h-5">
                <AiOutlineSetting size={15} />
                <AiFillCaretDown size={10} />
              </span>
            </button>
          }
        >
          <div class="absolute top-10 right-0 w-48 bg-white border border-solid border-gray-300 rounded">
            <MenuItem title="Move Selected" icon={<AiOutlineFolder />} />
            <MenuItem
              title="Delete Selected"
              classes="text-red-600"
              icon={<CgTrash />}
            />
            <Divider m={2} />
            <MenuItem title="Select All" icon={<AiOutlineCheckSquare />} />
            <MenuItem title="Unselect All" icon={<AiOutlineMinusSquare />} />
          </div>
        </Dropdown>
        <button
          onClick={() => onAddItemClick()}
          class="bg-white border-gray-300 font-semibold text-blue-800/90 py-1.5 px-2 rounded border-solid border hover:bg-blue-700/90 hover:text-white cursor-pointer"
        >
          <span class="flex space-x-1 justify-center items-center">
            <AiOutlinePlus size={15} />
            <span>Add Item</span>
          </span>
        </button>
      </div>
      <AddItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Header;
