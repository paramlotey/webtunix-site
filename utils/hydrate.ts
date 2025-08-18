// utils/hydrate.ts
import { AppStore } from "@/redux/Store/Store";
import { blogApi } from "@/redux/apis/BlogApi";

export async function preloadAllQueries(store: AppStore) {
  await Promise.all([
    store.dispatch(blogApi.endpoints.getAllBlogs.initiate(undefined)),
    // more queries can go here
  ]);
}
