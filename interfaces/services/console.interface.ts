interface GetEndpointsPayload {
  page: number;
  size: number;
  filter: string;
  cookie?: string | null;
}
type GetDailyStatPayload = GetEndpointsPayload;
type GetAllRequestsPayload = GetEndpointsPayload;
type GetFailedRequestsPayload = GetEndpointsPayload;

interface DailyStatResponse {
  _id: string;
  date: string;
  accounts: number;
  apihub: number;
  console: number;
  info: number;
  manager: number;
}

interface FailedRequestsResponse {
  id: string;
  date: Date;
  time: Date;
  error: { message: string };
  // data: { auth: { id: string; session: string } };
  data: { auth: { id: string; session: string } };
  request: { endpoint: string; version: string; domain: string; path: string };
}

interface AllRequestsResponse {
  time: Date;
  domain: string;
  version: string;
  path: string;
}

interface GetConsoleEndpointPayload {
  id: string;
  cookie?: string | null;
}

interface GetConsoleEndpointResponse {
  snippets: Snippets[];
  title: string;
  latency: number;
  description: string;
  category: string;
  method: string;
  response: string;
  lastUpdated: Date;
  bookmarks: number;
  path: string;
  id: string;
}

interface Snippets {
  title: string;
  code: string;
}

interface ConsoleEndpointTitleExistsResponse {
  exists: boolean;
}

interface ConsoleComposeEndpoint {
  response: any;
  latency: string;
}

interface SaveEndpointPayload {
  id: string;
  path: string;
  title: string;
  method: string;
  category: string;
  snippets: Snippets[];
  description: string;
}

// interface GetGameWorldsResponse {
//   ref: string;
//   title: string;
//   created: string;
//   totalUnmanaged: number;
// }

interface ConsoleData<K> {
  loading: boolean;
  page: number;
  rows: number;
  total: number;
  filter: string;
  content: K[];
}
