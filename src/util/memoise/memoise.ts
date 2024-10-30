export class Memoise {
  #cacheStore = new Map<string, any>();

  /**
   * Retrieve a cached value by key.
   * @param {string} key The key for the cached value.
   * @returns {string} The cached value, or undefined if not found.
   */
  public getCache(key: string): any | undefined {
    return this.#cacheStore.get(key);
  }

  /**
   * Store a value in the cache.
   * @param {string} key The key for the cached value.
   * @param {any} value The value to store in the cache.
   */
  public setCache(key: string, value: any): void {
    this.#cacheStore.set(key, value);
  }

  /**
   * Clear the entire cache.
   */
  public clearCache(): void {
    this.#cacheStore.clear();
  }

  /**
   * Delete a specific cache entry.
   * @param {string} key The key for the cached entry to delete.
   * @returns {boolean} True if the entry was deleted, false if not found.
   */
  public deleteCache(key: string): boolean {
    return this.#cacheStore.delete(key);
  }
}
