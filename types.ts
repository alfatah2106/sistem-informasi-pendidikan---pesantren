export type ViewState = 'landing' | 'school-admin' | 'pondok-monitoring' | 'tahfidz-app' | 'pondok-pay';

export interface AppFeature {
  id: ViewState;
  title: string;
  description: string;
  iconName: string;
  color: string;
}
