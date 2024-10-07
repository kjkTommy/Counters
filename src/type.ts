export interface Area {
  id: string;
}
export interface Counter {
  id: string;
  type: string[];
  installation_date: string;
  communication: string;
  is_automatic: boolean | null;
  initial_values: number[];
  area: {
    id: string;
  };
  description?: string;
}

export interface CounterResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Counter[];
}

export interface Result {
  count: number;
  next: string | null;
  previous: string | null;
  results: Counter[];
}
