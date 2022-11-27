import { Component, JSX } from 'solid-js';

const MenuItem: Component<{
  title: string;
  icon: JSX.Element;
  classes?: string;
}> = (props) => {
  const { title, icon, classes = '' } = props;

  return (
    <div
      class={`flex flex-row justify-start items-center space-x-2 mx-3 my-2 text-sm text-slate-700 cursor-pointer ${classes}`}
    >
      <span class="text-lg leading-none pt-0.5">{icon}</span>
      <p>{title}</p>
    </div>
  );
};

export default MenuItem;
