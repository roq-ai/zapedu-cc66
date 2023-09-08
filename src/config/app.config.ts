interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: [],
  tenantRoles: ['Administrator', 'User', 'Instance Manager', 'Chat Tester', 'Agent'],
  tenantName: 'Zap Edu',
  applicationName: 'ZapEdu',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage Agent profiles',
    'Assign Agents to specific Instances',
    'Monitor performance and interactions of Agents',
  ],
};
