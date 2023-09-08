import { InstanceInterface } from 'interfaces/instance';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AgentInterface {
  id?: string;
  uid: string;
  name: string;
  system_prompt?: string;
  context?: string;
  domain?: string;
  target?: string;
  goal?: string;
  extra_prompts?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  instance?: InstanceInterface[];
  user?: UserInterface;
  _count?: {
    instance?: number;
  };
}

export interface AgentGetQueryInterface extends GetQueryInterface {
  id?: string;
  uid?: string;
  name?: string;
  system_prompt?: string;
  context?: string;
  domain?: string;
  target?: string;
  goal?: string;
  extra_prompts?: string;
  user_id?: string;
}
