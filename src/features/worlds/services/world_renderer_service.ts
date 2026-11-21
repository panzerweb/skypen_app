import { WorldCreatePayload, WorldUpdatePayload } from "../types";

export const worldRendererService = {
  listWorlds() {
    return window.skypen.worlds.list();
  },
  singleWorld(id: string) {
    return window.skypen.worlds.single(id);
  },
  createWorld(payload: WorldCreatePayload) {
    return window.skypen.worlds.create(payload);
  },
  updateWorld(payload: WorldUpdatePayload) {
    return window.skypen.worlds.update(payload);
  },
  deleteWorld(id: string) {
    return window.skypen.worlds.delete(id);
  },
};
