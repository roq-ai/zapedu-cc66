import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ZapEduInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;

  user?: UserInterface;
  _count?: {};
}

export interface ZapEduGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
