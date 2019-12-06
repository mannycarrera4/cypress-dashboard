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
    pending: boolean;
    passed: boolean;
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
    result: {};
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
