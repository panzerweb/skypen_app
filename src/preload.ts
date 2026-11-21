// oxlint-disable eslint-plugin-unicorn/no-empty-file
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { SkypenAPI } from "./core/shared/contracts/skypen-api";
import {
  World,
  WorldCreatePayload,
  WorldUpdatePayload,
} from "./features/worlds/types";
import {
  WORLD_CREATE,
  WORLD_DELETE,
  WORLD_LIST,
  WORLD_SINGLE,
  WORLD_UPDATE,
} from "./core/shared/app_variables";

const api: SkypenAPI = {
  worlds: {
    list: () => ipcRenderer.invoke(WORLD_LIST),
    single: function (id: string): Promise<World> {
      return ipcRenderer.invoke(WORLD_SINGLE, id);
    },
    create: function (payload: WorldCreatePayload): Promise<World> {
      return ipcRenderer.invoke(WORLD_CREATE, payload);
    },
    update: function (payload: WorldUpdatePayload): Promise<World> {
      return ipcRenderer.invoke(WORLD_UPDATE, payload);
    },
    delete: function (id: string): Promise<void> {
      return ipcRenderer.invoke(WORLD_DELETE, id);
    },
  },
};

contextBridge.exposeInMainWorld("skypen", api);
