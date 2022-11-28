import {
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentComponent,
  Show,
  Signal,
} from 'solid-js';
import { v4 } from 'uuid';

type Props = {
  trigger: JSX.Element;
};

const dropdownSignals = new Map<string, Signal<boolean>>();

const registerDropdown = (id: string, signal: Signal<boolean>) => {
  dropdownSignals.set(id, signal);
};

const unregisterDropdown = (id: string) => {
  dropdownSignals.delete(id);
};

const closeAllDropdowns = (exclude: string[] = []) => {
  dropdownSignals.forEach(([, setSignal], key) =>
    !exclude.includes(key) ? setSignal(false) : null
  );
};

window.addEventListener('click', () => {
  closeAllDropdowns();
});

const Dropdown: ParentComponent<Props> = (props) => {
  const { trigger, children } = props;
  const id = v4();

  const signal = createSignal(false);
  const [showDropdown, setShowDropdown] = signal;

  onMount(() => {
    registerDropdown(id, signal);
  });

  onCleanup(() => {
    unregisterDropdown(id);
  });

  return (
    <div class="relative" onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => {
          closeAllDropdowns([id]);
          setShowDropdown((prev) => !prev);
        }}
      >
        {trigger}
      </div>
      <Show when={showDropdown()}>{children}</Show>
    </div>
  );
};

export default Dropdown;

export { default as MenuItem } from './MenuItem';
