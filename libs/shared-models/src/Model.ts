import { ApiRequest } from '@passvault/shared-services';

export class Model<DataType = unknown> {
  private readonly endpoint: string;
  private readonly request = new ApiRequest();

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async list() {
    return this.request.get<DataType[]>(`${this.endpoint}`);
  }

  async get(id: string) {
    return this.request.get<DataType>(`${this.endpoint}/${id}`);
  }

  async update(id: string, data: DataType) {
    return this.request.put<DataType, Partial<DataType>>(
      `${this.endpoint}/${id}`,
      data
    );
  }

  async create(data: Partial<DataType>) {
    return this.request.post<DataType, Partial<DataType>>(
      `${this.endpoint}`,
      data
    );
  }

  async delete(id: string) {
    return this.request.delete<DataType>(`${this.endpoint}/${id}`);
  }
}
