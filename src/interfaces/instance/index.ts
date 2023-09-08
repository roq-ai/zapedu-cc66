import { UserInterface } from 'interfaces/user';
import { AgentInterface } from 'interfaces/agent';
import { GetQueryInterface } from 'interfaces';

export interface InstanceInterface {
  id?: string;
  name: string;
  whatsapp_number: string;
  user_id: string;
  agent_id: string;
  webhook_url?: string;
  qr_code_url?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  agent?: AgentInterface;
  _count?: {};
}

export interface InstanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  whatsapp_number?: string;
  user_id?: string;
  agent_id?: string;
  webhook_url?: string;
  qr_code_url?: string;
}
