import { AiOutlineDown, AiOutlineUp } from 'solid-icons/ai';
import { Component, createSignal, For, JSX, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import Divider from '../../components/Divider';
import TextField from '../../components/TextField';

type SectionItem = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};

export type SidebarSection = {
  showHeader?: boolean;
  headerTitle?: string;
  headerExtra?: JSX.Element;
  items: SectionItem[];
};

export type SidebarProps = {
  title: string;
  headerExtra?: JSX.Element;
  showSearch?: boolean;
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
  sections: SidebarSection[];
};

const SectionItems: Component<{ section: SidebarSection }> = (props) => {
  const { section } = props;

  const [collapsed, setCollapsed] = createSignal<'open' | 'close'>('open');

  const DownIcon: Component = () => (
    <span onClick={() => setCollapsed(() => 'close')}>
      <AiOutlineDown class="text-slate-600" />
    </span>
  );
  const UpIcon: Component = () => (
    <span onClick={() => setCollapsed(() => 'open')}>
      <AiOutlineUp class="text-slate-600" />
    </span>
  );

  const CollapseIcons = {
    open: DownIcon,
    close: UpIcon,
  };

  return (
    <div class="mb-4">
      <Show when={section.showHeader}>
        <div class="flex space-x-2 text-sm mb-2 items-center">
          <span class="h-4 cursor-pointer">
            <Dynamic component={CollapseIcons[collapsed()]} />
          </span>
          <p class="text-slate-500 flex-1 text-start cursor-default">
            {section.headerTitle}
          </p>
          <Show when={section.headerExtra}>{section.headerExtra}</Show>
        </div>
      </Show>
      <Show when={collapsed() === 'open'}>
        <For each={section.items}>
          {(item) => (
            <div
              class="flex items-center space-x-2 text-slate-700 cursor-pointer text-sm hover:text-blue-700/90"
              onClick={item.onClick}
            >
              {item.icon}
              <p>{item.title}</p>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

const Sidebar: Component<SidebarProps> = (props) => {
  const {
    title,
    headerExtra,
    showSearch = true,
    onSearchChange,
    searchPlaceholder,
    sections,
  } = props;

  return (
    <div class="my-4 bg-white rounded border border-solid border-gray-300">
      <div class="flex justify-between min-h-[20px] items-center px-4 py-2 border-solid border-b border-b-gray-300 border-transparent bg-gray-100">
        <p class="font-semibold text-sm text-slate-800">
          {title.toUpperCase()}
        </p>
        <Show when={headerExtra}>
          <span>{headerExtra}</span>
        </Show>
      </div>
      <div class="mx-4">
        <Show when={showSearch}>
          <div class="flex flex-row justify-between items-center mt-4">
            <TextField
              id="search"
              placeholder={searchPlaceholder || 'Search'}
              onInput={(e) => onSearchChange?.(e.currentTarget.value)}
            />
          </div>
        </Show>
        <Divider />
        <nav>
          <For each={sections}>
            {(section) => <SectionItems section={section} />}
          </For>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
