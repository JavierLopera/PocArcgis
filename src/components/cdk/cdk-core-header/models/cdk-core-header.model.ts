export interface CDKCoreHeaderNavigation {
  id: string;
  name: string;
  href?: string;
  icon?: string;
  children?: CDKCoreHeaderNavigation[]
}