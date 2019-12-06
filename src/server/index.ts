import build from "fastify";

const specTimeout = 1000;

const fastify = build({ logger: true });

import * as Api from "./types";
import * as db from "./api";

fastify.get("/", async () => {
  return db.getState();
});

fastify.get("/projects", async req => {
  return db.getProjects();
});

fastify.post("/projects", async req => {
  return db.createProject(req.body);
});

fastify.get("/projects/:projectId", async req => {
  return db.getProject({ id: req.params.projectId });
});

fastify.get("/projects/:projectId/runs/:runId", async req => {
  const project = await db.getProject({ id: req.params.projectId });
  return db.getRun({ id: req.params.runId }, project);
});

fastify.post(
  "/projects/:projectId/runs",
  async (req: Api.CreateRunRequest): Promise<Api.CreateRunResponse> => {
    const { projectId } = req.params;
    const { id, specs, machineId } = req.body;

    const project = await db.getProject({ id: projectId });
    if (!project) throw Error(`Could not find project ${projectId}`);

    let run = await db.getRun({ id }, project);
    if (run) {
      console.log(`Run already created. Using existing run`);
    } else {
      run = await db.createRun({ id, specs }, project);
    }

    const spec = run.specs.remaining[0];
    run.specs.remaining = run.specs.remaining.filter(s => s !== spec);
    if (spec) {
      run.specs.running.push({
        name: spec,
        runner: machineId,
        started: +new Date()
      });
    }

    const done =
      run.specs.remaining.length === 0 && run.specs.running.length === 0;

    return {
      id,
      spec,
      done
    };
  }
);

fastify.post(
  "/projects/:projectId/runs/:id/specs",
  async (req: Api.UpdateRunSpecRequest): Promise<Api.UpdateRunSpecResponse> => {
    const { spec, machineId } = req.body;
    const { id, projectId } = req.params;
    const project = await db.getProject({ id: projectId });
    const run = await db.getRun({ id }, project);
    if (run) {
      const running = run.specs.running.find(s => s.name === spec);
      if (running) {
        run.specs.running = run.specs.running.filter(s => s.name !== spec);
        run.results.push({
          name: spec,
          started: running.started,
          stopped: +new Date(),
          machineId,
          passed: true,
          pending: false
        });
      }
    }
    return {};
  }
);

const start = async () => {
  await fastify
    .listen(3001)
    .then(address => {
      console.log("Server listening on ", address);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

start();
