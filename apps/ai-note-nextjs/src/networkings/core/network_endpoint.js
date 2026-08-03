export const HttpMehod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export class NetworkEndpoint {
  constructor({ path, method = HttpMehod.GET, headers = {}, queryParams = {}, body = null }) {
    this.path = path;
    this.method = method;
    this.headers = headers;
    this.queryParams = queryParams;
    this.body = body;
  }

  static get(path, headers = {}, queryParams = {}) {
    return new NetworkEndpoint({ path, method: HttpMehod.GET, headers, queryParams });
  }

  static post(path, body = null, headers = {}, queryParams = {}) {
    return new NetworkEndpoint({ path, method: HttpMehod.POST, headers, queryParams, body });
  }

  static put(path, body = null, headers = {}, queryParams = {}) {
    return new NetworkEndpoint({ path, method: HttpMehod.PUT, headers, queryParams, body });
  }

  static delete(path, headers = {}, queryParams = {}) {
    return new NetworkEndpoint({ path, method: HttpMehod.DELETE, headers, queryParams });
  }

  static patch(path, body = null, headers = {}, queryParams = {}) {
    return new NetworkEndpoint({ path, method: HttpMehod.PATCH, headers, queryParams, body });
  } 
}
