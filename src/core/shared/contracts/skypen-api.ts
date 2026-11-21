import {
  World,
  WorldCreatePayload,
  WorldUpdatePayload,
} from "../../../features/worlds/types";

export interface SkypenAPI {
  // API contracts for world
  worlds: {
    list: () => Promise<World[]>;
    single: (id: string) => Promise<World>;
    create: (payload: WorldCreatePayload) => Promise<World>;
    update: (payload: WorldUpdatePayload) => Promise<World>;
    delete: (id: string) => Promise<void>;
  };
}
