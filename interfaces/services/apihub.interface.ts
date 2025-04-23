type AllowedLimit = 3 | 10 | 20;

interface GetEndpoints {
  page?: number;
  size: AllowedLimit;
  phrase?: string;
  category?: string;
  token?: null | string;
  sequence?: "next" | "prev";
  filter: "all" | "category" | "search";
}

interface GetEndpointsCategories {
  limit: AllowedLimit;
}
