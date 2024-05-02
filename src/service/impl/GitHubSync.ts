import { Sync } from "@/service/sync.ts";

class GitHubSync implements Sync {
  constructor() {}

  download(): Promise<string[]> {
    return Promise.resolve([]);
  }

  upload(extension: string[]): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default GitHubSync;
