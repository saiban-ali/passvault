import { Component } from 'solid-js';
import Header from './components/Header';
import VaultItems from './components/VaultItems';

const Vault: Component = () => {
  return (
    <div>
      <Header />
      <VaultItems />
    </div>
  );
};

export default Vault;
