import { defineStore } from "pinia";
import { World } from "../types";

export const useWorldStore = defineStore("worlds", {
  state: () => ({
    worlds: [] as World[],
    activeWorldId: null as string | null,
  }),
  getters: {
    activeWorld: (state): World | null => {
      return (
        state.worlds.find((world) => world.id === state.activeWorldId) ?? null
      );
    },
    worldCount: (state): number => state.worlds.length,
  },
  actions: {
    setWorlds(data: World[]) {
      this.worlds = data;
    },
    addWorld(world: World) {
      const exists = this.worlds.some((value) => value.id === world.id);

      if (!exists) {
        this.worlds.unshift(world);
      }
    },
    selectWorld(id: string | null) {
      this.activeWorldId = id;
    },
    upsertWorld(world: World) {
      const index = this.worlds.findIndex((item) => item.id === world.id);

      if (index === -1) {
        this.worlds.push(world);
      } else {
        this.worlds[index] = world;
      }
    },
    updateWorld(updatedData: World) {
      console.log("Received world:", updatedData);
      console.log("Existing worlds:", this.worlds);
      const index = this.worlds.findIndex(
        (world) => world.id === updatedData.id,
      );

      if (index != -1) {
        this.worlds[index] = updatedData;
      }
    },
    deleteWorld(id: string) {
      this.worlds = this.worlds.filter((world) => world.id != id);

      if (this.activeWorldId === id) {
        this.activeWorldId = null;
      }
    },
  },
});
