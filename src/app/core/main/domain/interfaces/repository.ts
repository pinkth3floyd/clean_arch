

export interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<boolean>;
}


export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedRepository<T, ID> extends Repository<T, ID> {
  findPaginated(page: number, pageSize: number): Promise<PaginatedResult<T>>;
}
