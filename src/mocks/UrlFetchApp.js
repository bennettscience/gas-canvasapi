export class UrlFetchApp {
  static fetch(url, params) {
    throw new Error('Fetch not implemented. Mock/stub this with jest.spyOn(), sinon.stub(), or similar.');
  }

  static fetchAll(requests) {
    return requests.map(request => {
      const { url, ...params } = request;

      return UrlFetchApp.fetch(url, request);
    });
  }

  static getRequest(url, params) {
    return {
      method: 'get',
      ...params,
      url,
    };
  }
}
