import { Component } from 'solid-js';

type Props = {
  m?: number;
};

const Divider: Component<Props> = ({ m = 4 }) => (
  <hr class={`bg-gray-300 h-[1px] border-none my-${m}`} />
);

export default Divider;
