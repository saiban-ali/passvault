export class LocalStorage {
  static get(key: string) {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (err) {
      return item;
    }
  }

  static set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
