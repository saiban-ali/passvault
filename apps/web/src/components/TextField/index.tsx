import { Component, JSX, Show, splitProps } from 'solid-js';

type FieldProps = {
  label?: string;
  id: string;
  suffix?: JSX.Element;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

const TextField: Component<FieldProps> = (props) => {
  const [local, rest] = splitProps(props, ['label', 'suffix', 'id']);
  const { label, suffix, id } = local;
  return (
    <div class="flex flex-col w-full">
      <Show when={label}>
        <label for={id} class="text-left text-base text-slate-800 mb-1">
          {label}
        </label>
      </Show>
      <div class="flex flex-row items-center">
        <input
          type="text"
          id={id}
          {...rest}
          class="flex-1 border-gray-300 h-8 shadow-sm outline-none border-solid border px-3 rounded focus:shadow-[0_0_0_0.2rem_rgba(23,93,220,0.25)]"
        />
        <Show when={suffix}>
          <span class="text-blue-700/90 text-2xl mt-2 ml-3 cursor-pointer">
            {suffix}
          </span>
        </Show>
      </div>
    </div>
  );
};

export default TextField;
