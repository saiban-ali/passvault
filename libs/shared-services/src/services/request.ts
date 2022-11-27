import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { LocalStorage } from './localStorage';

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type ApiResponse<DataType> = {
  status: number;
  message: string;
  data: DataType;
};

export class ApiError extends Error {
  errorData?: unknown;
  status?: number;
  axiosError?: AxiosError;

  constructor(message: string);
  constructor(error: Error);
  constructor(arg: unknown) {
    if (arg instanceof Error) {
      super(arg.message);
      if (axios.isAxiosError(arg)) {
        this.status = parseInt(arg.status);
        this.axiosError = arg;
      }
      return;
    }

    super(arg as string);
  }
}

export class ApiRequest {
  private readonly baseUrl =
    'https://eyscn4b227.execute-api.us-east-1.amazonaws.com/dev';

  protected async request<ReturnType = unknown, DataType = unknown>(
    method: RequestMethod,
    endpoint: string,
    body: DataType,
    config: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'> = {}
  ): Promise<ApiResponse<ReturnType>> {
    try {
      const res = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data: body,
        ...config,
      });

      return {
        status: res.status,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (err) {
      throw new ApiError(err as Error);
    }
  }

  async get<ReturnType>(
    endpoint: string,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) {
    return this.request<ReturnType>(
      RequestMethod.GET,
      endpoint,
      undefined,
      config
    );
  }

  async post<ReturnType, DataType = unknown>(
    endpoint: string,
    data: DataType,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) {
    return await this.request<ReturnType>(
      RequestMethod.POST,
      endpoint,
      data,
      config
    );
  }

  async put<ReturnType, DataType>(
    endpoint: string,
    data: DataType,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) {
    return await this.request<ReturnType>(
      RequestMethod.PUT,
      endpoint,
      data,
      config
    );
  }

  async delete<ReturnType>(
    endpoint: string,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) {
    return await this.request<ReturnType>(
      RequestMethod.DELETE,
      endpoint,
      undefined,
      config
    );
  }
}

export class AuthorizedRequest extends ApiRequest {
  private readonly token: string;

  constructor() {
    super();
    this.token = LocalStorage.get('token');
  }

  async request<ReturnType = unknown, DataType = unknown>(
    method: RequestMethod,
    endpoint: string,
    body: DataType,
    config: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'> = {}
  ): Promise<ApiResponse<ReturnType>> {
    if (!this.token) {
      throw new ApiError('No token provided');
    }

    return super.request(method, endpoint, body, config);
  }
}
