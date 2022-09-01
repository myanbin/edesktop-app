import { Channels } from 'main/preload';
import { Response } from 'main/request';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
      httpRequest(target: string, data: unknown): Promise<Response>;
    };
  }
}

export {};
