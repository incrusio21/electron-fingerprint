import { IPC } from './context';

export declare global {
  const context: IPC

  interface Window {
    context: IPC 
  }
}
