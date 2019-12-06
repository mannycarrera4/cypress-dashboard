import fs, { writeFileSync } from "fs";
import util from "util";

import * as API from "./types";

const writeFile = util.promisify(fs.writeFile);
const dbFile = "./db.json";

if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, `{"projects": []}`);
}

const db: State = require("./db.json");

async function writeDB() {
  await writeFile(dbFile, JSON.stringify(db, null, "  "));
}

export interface State {
  projects: API.Project[];
}

export async function getState(): Promise<State> {
  return db;
}

export async function getProjects(): Promise<API.Project[]> {
  return db.projects;
}

export async function getProject({ id }): Promise<API.Project | null> {
  return db.projects.find(p => p.id === id) || null;
}

export async function createProject({
  id,
  name,
  url
}: API.CreateProjectRequest): Promise<API.Project> {
  const project = {
    id,
    name,
    url,
    runs: []
  };
  db.projects.push(project);
  await writeDB();
  return project;
}

export async function getRun(
  { id }: { id: string },
  project: API.Project | null,
  state = db
): Promise<API.Run | null> {
  if (!project) return null;
  return project.runs.find(run => run.id === id) || null;
}

export async function createRun(
  { id, specs }: { id: string; specs: string[] },
  project: API.Project
): Promise<API.Run> {
  if (project.runs.find(p => p.id === id)) {
    throw `A run with an id of '${id}' already exists`;
  }
  const run = {
    id,
    specs: {
      names: specs.sort(),
      remaining: specs,
      running: []
    },
    results: []
  };

  project.runs.push(run);
  await writeDB();
  return run;
}

export async function claimSpec(
  { id, machineId }: { id: string; machineId: string; spec: string },
  project: API.Project
): Promise<API.Project> {
  const run = await getRun({ id }, project);
  if (!run) {
    throw Error(`Could not find run ${id}`);
  }

  const spec = run.specs.remaining.splice(1, 1)[0];
  run.specs.running.push({
    name: spec,
    runner: machineId,
    started: +new Date()
  });

  await writeDB();
  return project;
}

export async function isDone(
  { id }: { id: string },
  project: API.Project
): Promise<boolean> {
  const run = await getRun({ id }, project);
  if (!run) {
    throw Error("Could not find run");
  }

  return run.specs.remaining.length === 0 && run.specs.running.length === 0;
}
