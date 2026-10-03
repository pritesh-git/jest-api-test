import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { MOCK_UNKNOWN_RESOURCES, MOCK_USERS } from "./mockData";

export function setupMockAdapter(
  client: AxiosInstance,
  options?: { delayResponse?: number }
): MockAdapter {
  const mock = new MockAdapter(client, {
    delayResponse: options?.delayResponse ?? 0,
    onNoMatch: "passthrough",
  });

  // GET /users?page=...
  mock.onGet(/\/users(\?.*)?$/).reply((config) => {
    const url = config.url || "";
    const pageMatch = url.match(/page=(\d+)/);
    const page = pageMatch ? Number(pageMatch[1]) : 1;
    const perPage = 6;
    const start = (page - 1) * perPage;
    const users = MOCK_USERS.slice(start, start + perPage);

    return [
      200,
      {
        page,
        per_page: perPage,
        total: MOCK_USERS.length,
        total_pages: Math.ceil(MOCK_USERS.length / perPage),
        data: users,
        support: {
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!",
        },
      },
    ];
  });

  // GET /users/:id
  mock.onGet(/\/users\/\d+$/).reply((config) => {
    const match = (config.url || "").match(/\/users\/(\d+)$/);
    const id = match ? Number(match[1]) : 0;
    const user = MOCK_USERS.find((u) => u.id === id);

    if (!user) {
      return [404, {}];
    }

    return [
      200,
      {
        data: user,
        support: {
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!",
        },
      },
    ];
  });

  // GET /unknown/:id
  mock.onGet(/\/unknown\/\d+$/).reply((config) => {
    const match = (config.url || "").match(/\/unknown\/(\d+)$/);
    const id = match ? Number(match[1]) : 0;
    const resource = MOCK_UNKNOWN_RESOURCES.find((r) => r.id === id);

    if (!resource) {
      return [404, {}];
    }

    return [
      200,
      {
        data: resource,
        support: {
          url: "https://reqres.in/#support-heading",
          text: "To keep ReqRes free, contributions towards server costs are appreciated!",
        },
      },
    ];
  });

  // GET /unknown
  mock.onGet(/\/unknown$/).reply(200, {
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: MOCK_UNKNOWN_RESOURCES,
    support: {
      url: "https://reqres.in/#support-heading",
      text: "To keep ReqRes free, contributions towards server costs are appreciated!",
    },
  });

  // POST /users
  mock.onPost(/\/users$/).reply((config) => {
    const data =
      typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
    return [
      201,
      {
        name: data?.name || "morpheus",
        job: data?.job || "leader",
        id: String(Math.floor(Math.random() * 900) + 100),
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // PUT /users/:id
  mock.onPut(/\/users\/\d+$/).reply((config) => {
    const data =
      typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
    return [
      200,
      {
        name: data?.name || "morpheus",
        job: data?.job || "zion resident",
        updatedAt: new Date().toISOString(),
      },
    ];
  });

  // PATCH /users/:id
  mock.onPatch(/\/users\/\d+$/).reply((config) => {
    const data =
      typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
    return [
      200,
      {
        name: data?.name,
        job: data?.job,
        updatedAt: new Date().toISOString(),
      },
    ];
  });

  // DELETE /users/:id
  mock.onDelete(/\/users\/\d+$/).reply(204, "");

  // POST /login
  mock.onPost(/\/login$/).reply((config) => {
    const data =
      typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
    if (!data?.password) {
      return [400, { error: "Missing password" }];
    }
    return [200, { token: "QpwL5tke4Pnpja7X4" }];
  });

  // POST /register
  mock.onPost(/\/register$/).reply((config) => {
    const data =
      typeof config.data === "string" ? JSON.parse(config.data || "{}") : config.data || {};
    if (!data?.password) {
      return [400, { error: "Missing password" }];
    }
    return [200, { id: 4, token: "QpwL5tke4Pnpja7X4" }];
  });

  return mock;
}

export default setupMockAdapter;
