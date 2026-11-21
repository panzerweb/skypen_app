import { randomUUID } from "node:crypto";
import {
  World,
  WorldCreatePayload,
  WorldUpdatePayload,
} from "../../../../features/worlds/types";
import { getDatabase } from "../../../database/connection";

const ALLOWED_WORLD_COLUMNS: (keyof WorldUpdatePayload)[] = [
  "name",
  "description",
];

export const worldRepository = {
  // Listing all worlds
  findAll(): World[] {
    return getDatabase()
      .prepare(
        `
            SELECT id, name, description, created_at AS createdAt
            FROM worlds
            ORDER BY created_at DESC    
        `,
      )
      .all() as World[];
  },

  //   Fetching single record of a world
  fetchWorld(id: string): World | undefined {
    return getDatabase()
      .prepare(
        `
                SELECT id, name, description, created_at AS createdAt
                FROM worlds
                WHERE id = ?
            `,
      )
      .get(id) as World | undefined;
  },

  //   Creating a world
  createWorld(data: WorldCreatePayload): World {
    const db = getDatabase();

    const world: World = {
      id: randomUUID().toString(),
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
    };

    const transaction = db.transaction(() => {
      db.prepare(
        `
            INSERT INTO worlds (id, name, description, created_at)
            VALUES (?, ?, ?, ?)    
        `,
      ).run(world.id, world.name, world.description, world.createdAt);
    });

    transaction();

    return world;
  },

  //   Updating a world
  updateWorld(data: WorldUpdatePayload): World | undefined {
    if (data.id === undefined || data.id === null) {
      throw new Error("Cannot update world without an id");
    }

    const db = getDatabase();

    const validKeys = (
      Object.keys(data) as (keyof WorldUpdatePayload)[]
    ).filter(
      (key) => ALLOWED_WORLD_COLUMNS.includes(key) && data[key] !== undefined,
    );

    if (validKeys.length == 0) {
      return undefined;
    }

    const setClause = validKeys.map((key) => `${key} = @${key}`).join(", ");

    db.prepare(
      `
        UPDATE worlds
        SET ${setClause}
        WHERE id = @id
        `,
    ).run(data);

    const world = db
      .prepare(
        `SELECT id, name, description, created_at as createdAt
        FROM worlds
        WHERE id = ?`,
      )
      .get(data.id) as World | undefined;

    return world;
  },

  //   Deleting a world
  deleteWorld(id: string): void {
    if (id == null || id == undefined) {
      throw new Error("Cannot delete. Identifier missing.");
    }

    const db = getDatabase();

    db.prepare(`DELETE FROM worlds WHERE id = ?`).run(id);
  },
};
