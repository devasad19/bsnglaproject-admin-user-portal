export type MenuType = {
  id: number,
  title: string,
  url: string,
  subLinks?: {
    id: number,
    title: string,
    url: string,
  },
};