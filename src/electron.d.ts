import { SkypenAPI } from "./core/shared/contracts/skypen-api";

declare global {
  interface Window {
    skypen: SkypenAPI;
  }
}

export {};
