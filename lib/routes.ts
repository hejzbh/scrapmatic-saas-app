const APP_ROUTE = "/app";

export const routes = {
  home: "/",
  app: {
    home: APP_ROUTE,
    workflows: `${APP_ROUTE}/workflows`,
    credentials: `${APP_ROUTE}/credentials`,
    billing: `${APP_ROUTE}/billing`,
    workflowEditor: function (workflowId: string) {
      return `${this.workflows}/${workflowId}/editor`;
    },
    workflowExecutions: function (workflowId: string) {
      return `${this.workflows}/${workflowId}/executions`;
    },
    workflowExecutionDetails: function (
      workflowId: string,
      executionId: string
    ) {
      return `${this.workflows}/${workflowId}/executions/${executionId}`;
    },
  },
};
