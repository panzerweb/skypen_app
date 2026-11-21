export const WORLDTABLE: string = `
    CREATE TABLE IF NOT EXISTS worlds (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TEXT NOT NULL
    );
`;
