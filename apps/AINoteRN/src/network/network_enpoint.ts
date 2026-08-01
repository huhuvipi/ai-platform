export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export class NetworkEndpoint {
  public readonly path: string;
  public readonly method: HttpMethod;
  public readonly headers: Record<string, string> = {};
  public readonly queryParams: Record<string, string> = {};
  public readonly body: any = null;

  constructor(
    path: string,
    method: HttpMethod,
    headers: Record<string, string> = {},
    queryParams: Record<string, string> = {},
    body: any = null
  ) {
    this.path = path;
    this.method = method;
    this.headers = headers;
    this.queryParams = queryParams;
    this.body = body;
  }
  static get(path: string, queryParams: Record<string, string> = {}, headers: Record<string, string> = {}): NetworkEndpoint {
    return new NetworkEndpoint(path, HttpMethod.GET, headers, queryParams);
  }

  static post(path: string, body: any, headers: Record<string, string> = {}, queryParams: Record<string, string> = {}): NetworkEndpoint {
    return new NetworkEndpoint(path, HttpMethod.POST, headers, queryParams, body);
  }

  static put(path: string, body: any, headers: Record<string, string> = {}, queryParams: Record<string, string> = {}): NetworkEndpoint {
    return new NetworkEndpoint(path, HttpMethod.PUT, headers, queryParams, body);
  }

  static delete(path: string, headers: Record<string, string> = {}, queryParams: Record<string, string> = {}): NetworkEndpoint {
    return new NetworkEndpoint(path, HttpMethod.DELETE, headers, queryParams);
  }

  static patch(path: string, body: any, headers: Record<string, string> = {}, queryParams: Record<string, string> = {}): NetworkEndpoint {
    return new NetworkEndpoint(path, HttpMethod.PATCH, headers, queryParams, body);
  }
}