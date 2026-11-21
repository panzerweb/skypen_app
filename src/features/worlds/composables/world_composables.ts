import { storeToRefs } from "pinia";
import { useWorldStore } from "../stores/world_store";
import { ref } from "vue";
import { worldRendererService } from "../services/world_renderer_service";
import { World, WorldCreatePayload, WorldUpdatePayload } from "../types";

export function useWorlds() {
  // States from Pinia
  const store = useWorldStore();
  const worldCount: number = store.worldCount;
  const { worlds, activeWorld } = storeToRefs(store);

  //   Loading states
  const loading = ref(false);
  const isCreating = ref(false);
  const isUpdatingOrDeleting = ref(false);

  //   Error states
  const errorMessage = ref<string | null>(null);
  const errorCreateMessage = ref<string | null>(null);
  const errorMutationMessage = ref<string | null>(null);

  async function loadWorlds() {
    loading.value = true;
    errorMessage.value = null;

    try {
      const data: World[] = await worldRendererService.listWorlds();

      store.setWorlds(data);
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : "Failed to load worlds";
    } finally {
      loading.value = false;
    }
  }

  async function loadSingleWorld(id: string) {
    loading.value = true;
    errorMessage.value = null;

    try {
      const data = await worldRendererService.singleWorld(id);

      store.upsertWorld(data);
      store.selectWorld(data.id);
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : `Failed to load world ${id}`;
    } finally {
      loading.value = false;
    }
  }

  async function createSingleWorld(payload: WorldCreatePayload) {
    isCreating.value = true;
    errorCreateMessage.value = null;

    try {
      const world = await worldRendererService.createWorld(payload);

      store.addWorld(world);
      store.selectWorld(world.id);

      return world;
    } catch (error) {
      errorCreateMessage.value =
        error instanceof Error
          ? error.message
          : `Failed to create ${payload.name}`;
    } finally {
      isCreating.value = false;
    }
  }

  async function updateWorldData(
    payload: WorldUpdatePayload,
  ): Promise<boolean> {
    isUpdatingOrDeleting.value = true;
    errorMutationMessage.value = null;

    try {
      const updatedWorld = await worldRendererService.updateWorld(payload);

      console.log(`Updated world ${updatedWorld}`);

      store.updateWorld(updatedWorld);
      store.selectWorld(updatedWorld.id);

      return true;
    } catch (error) {
      console.log(error instanceof Error ? error.stack : "Error");
      errorMutationMessage.value =
        error instanceof Error
          ? error.message
          : `Failed to updated ${payload.name}`;

      return false;
    } finally {
      isUpdatingOrDeleting.value = false;
    }
  }

  async function deleteWorldData(id: string): Promise<boolean> {
    isUpdatingOrDeleting.value = true;
    errorMutationMessage.value = null;

    try {
      await worldRendererService.deleteWorld(id);

      store.deleteWorld(id);
      return true;
    } catch (error) {
      errorMutationMessage.value =
        error instanceof Error ? error.message : `Failed to delete world ${id}`;

      return false;
    } finally {
      isUpdatingOrDeleting.value = false;
    }
  }

  return {
    worlds,
    worldCount,
    activeWorld,
    loading,
    isCreating,
    isUpdatingOrDeleting,
    errorMessage,
    errorCreateMessage,
    errorMutationMessage,
    loadWorlds,
    loadSingleWorld,
    createSingleWorld,
    updateWorldData,
    deleteWorldData,
  };
}
