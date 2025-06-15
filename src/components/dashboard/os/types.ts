
export type Module = {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  action?: (() => void) | undefined;
  category: string;
  color: string;
}
