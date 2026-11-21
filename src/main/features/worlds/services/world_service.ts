import {
  WorldCreatePayload,
  WorldUpdatePayload,
} from "../../../../features/worlds/types";
import { worldRepository } from "../repositories/world_repository";

export const worldService = {
  listWorlds() {
    return worldRepository.findAll();
  },
  fetchWorld(id: string) {
    if (id == null || id == undefined) {
      throw new Error("Identifier missing. Please try again.");
    }
    return worldRepository.fetchWorld(id);
  },
  createWorld(payload: WorldCreatePayload) {
    if (typeof payload?.name !== "string") {
      throw new Error("World name is required");
    }

    const name = payload.name.trim();

    if (!name || name.length > 120) {
      throw new Error("Invalid world name");
    }
    return worldRepository.createWorld(payload);
  },
  updateWorld(payload: WorldUpdatePayload) {
    if (payload.id == null || payload.id == undefined) {
      throw new Error("Identifier missing. Please try again.");
    }
    return worldRepository.updateWorld(payload);
  },
  deleteWorld(id: string) {
    if (id == null || id == undefined) {
      throw new Error("Identifier missing. Please try again.");
    }
    return worldRepository.deleteWorld(id);
  },
};
