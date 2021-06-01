function fakeRequest(_url, _body) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  buildUrl(url) {
    return [this.baseUrl, url]
      .map((u) => u.replace(/^\/(.+)\/$/), "")
      .join("/");
  }

  async signIn(email, password) {
    return fakeRequest(this.buildUrl("/signin"), { email, password });
  }

  async signout() {
    return fakeRequest(this.buildUrl("/singout"));
  }
}
