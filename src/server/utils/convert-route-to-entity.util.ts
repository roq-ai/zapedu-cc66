const mapping: Record<string, string> = {
  agents: 'agent',
  instances: 'instance',
  users: 'user',
  'zap-edus': 'zap_edu',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
