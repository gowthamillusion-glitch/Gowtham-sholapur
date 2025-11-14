
export type ServiceId = 'analyze' | 'generate' | 'edit' | 'animate';

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
}
