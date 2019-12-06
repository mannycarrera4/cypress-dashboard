export interface Result {
  stats: Stats;
  reporter: string;
  reporterStats: ReporterStats;
  hooks?: HooksEntity[] | null;
  tests?: TestsEntity[] | null;
  error?: string | null;
  video: string;
  screenshots?: ScreenshotEntity[] | null;
  spec: Spec;
  shouldUploadVideo: boolean;
}
export interface ScreenshotEntity {
  screenshotId: string;
  name: string | null;
  testId: string;
  takenAt: string;
  path: string;
  height: number;
  width: number;
}
export interface Stats {
  suites: number;
  tests: number;
  passes: number;
  pending: number;
  skipped: number;
  failures: number;
  wallClockStartedAt: string;
  wallClockEndedAt: string;
  wallClockDuration: number;
}
export interface ReporterStats {
  suites: number;
  tests: number;
  passes: number;
  pending: number;
  failures: number;
  start: string;
  end: string;
  duration: number;
}
export interface HooksEntity {
  hookId: string;
  hookName: string;
  title?: string[] | null;
  body: string;
}
export interface TestsEntity {
  testId: string;
  title?: string[] | null;
  state: string;
  body: string;
  stack?: string | null;
  error?: string | null;
  timings: Timings;
  failedFromHookId?: null;
  wallClockStartedAt: string;
  wallClockDuration: number;
  videoTimestamp: number;
}
export interface Timings {
  lifecycle: number;
  "before each"?: BeforeEachEntity[] | null;
  test: Test;
}
export interface BeforeEachEntity {
  hookId: string;
  fnDuration: number;
  afterFnDuration: number;
}
export interface Test {
  fnDuration: number;
  afterFnDuration: number;
}
export interface Spec {
  name: string;
  relative: string;
  absolute: string;
}

export interface Run {
  id: string;
  specs: {
    names: string[];
    remaining: string[];
    running: {
      runner: string;
      name: string;
      started: number;
    }[];
  };
  results: {
    name: string;
    machineId: string;
    started: number;
    stopped: number;
    passed: boolean;
    result: Result;
  }[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
  runs: Run[];
}

export interface CreateRunRequest {
  body: {
    id: string;
    specs: string[];
    machineId: string;
  };
  params: {
    projectId: string;
  };
}

export interface CreateRunResponse {
  id: string;
  spec: string;
  done: boolean;
}

export interface UpdateRunSpecRequest {
  body: {
    spec: string;
    machineId: string;
    result: Result;
  };
  params: {
    id: string;
    projectId: string;
  };
}

export interface UpdateRunSpecResponse {}

export interface CreateProjectRequest {
  id: string;
  name: string;
  url: string;
}
