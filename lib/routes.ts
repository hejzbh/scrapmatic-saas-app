const APP_ROUTE = "/app";

export const routes = {
  home: "/",
  app: {
    home: APP_ROUTE,
    workflows: `${APP_ROUTE}/workflows`,
    credentials: `${APP_ROUTE}/credentials`,
    billing: `${APP_ROUTE}/billing`,
    workflowEditor: function (id: string) {
      return `${this.workflows}/${id}/editor`;
    },
  },
};
