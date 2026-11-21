import { ipcMain } from "electron";
import type { WebContents } from "electron/main";
import { worldService } from "../services/world_service";
import {
  WorldCreatePayload,
  WorldUpdatePayload,
} from "../../../../features/worlds/types";
import {
  WORLD_CREATE,
  WORLD_DELETE,
  WORLD_LIST,
  WORLD_SINGLE,
  WORLD_UPDATE,
} from "../../../../core/shared/app_variables";

export function registerWorldHandlers(trustedWebContents: WebContents): void {
  ipcMain.handle(WORLD_LIST, (event) => {
    if (event.sender !== trustedWebContents) {
      throw new Error("Unauthorized IPC sender");
    }

    return worldService.listWorlds();
  });

  ipcMain.handle(WORLD_SINGLE, (event, id: string) => {
    if (event.sender !== trustedWebContents) {
      throw new Error("Unauthorized IPC sender");
    }

    return worldService.fetchWorld(id);
  });

  ipcMain.handle(WORLD_CREATE, (event, payload: WorldCreatePayload) => {
    if (event.sender !== trustedWebContents) {
      throw new Error("Unauthorized IPC sender");
    }

    return worldService.createWorld(payload);
  });

  ipcMain.handle(WORLD_UPDATE, (event, payload: WorldUpdatePayload) => {
    if (event.sender !== trustedWebContents) {
      throw new Error("Unauthorized IPC sender");
    }

    return worldService.updateWorld(payload);
  });
  ipcMain.handle(WORLD_DELETE, (event, id: string) => {
    if (event.sender !== trustedWebContents) {
      throw new Error("Unauthorized IPC sender");
    }

    return worldService.deleteWorld(id);
  });
}
