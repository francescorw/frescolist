import { MaxInt } from "@spotify/web-api-ts-sdk";

export type Page = {
  pageSize: MaxInt<50>;
  pageIndex: MaxInt<50>;
}

export type FilledPage<T> = Page & {
  totalItems: number;
  currentPageItems: T[];
}
