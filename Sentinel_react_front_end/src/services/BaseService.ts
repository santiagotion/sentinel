export class BaseService {
  protected storageKey: string;
  
  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }
  
  protected saveToStorage<T>(data: T): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
  
  protected loadFromStorage<T>(): T | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
  
  protected generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  protected generateTimestamp(): string {
    return new Date().toISOString();
  }
  
  protected simulateDelay(ms: number = 100): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  protected generateMockData<T>(generator: () => T, count: number): T[] {
    return Array.from({ length: count }, generator);
  }
}