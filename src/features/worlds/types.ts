export interface World {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface WorldCreatePayload {
  name: string;
  description?: string;
}

export interface WorldUpdatePayload {
  id: string;
  name?: string;
  description?: string;
}
