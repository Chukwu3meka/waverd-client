interface NonPaginatedResponse<K> {
  success: boolean;
  message: string;
  data: K;
}

interface PaginatedResponse<K> {
  success: boolean;
  message: string;
  data: {
    size: number;
    page: number;
    totalElements: number;
    content: K[];
  };
}
