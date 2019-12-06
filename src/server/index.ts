import build from "fastify";
import fastifyStatic from "fastify-static";

const specTimeout = 1000;

const fastify = build({ logger: true, maxParamLength: 1000 });

import * as Api from "./types";
import * as db from "./api";

fastify.register(fastifyStatic, {
  root: "/" // shouldn't be root of whole file system
});

fastify.get("/assets/:asset", (req, res) => {
  (res as any).sendFile(req.params.asset);
});

fastify.get("/api/", async () => {
  return db.getState();
});

fastify.get("/api/projects", async req => {
  return db.getProjects();
});

fastify.post("/api/projects", async req => {
  return db.createProject(req.body);
});

fastify.get("/api/projects/:projectId", async req => {
  return db.getProject({ id: req.params.projectId });
});

fastify.get("/api/projects/:projectId/runs/:runId", async (req, res) => {
  const project = await db.getProject({ id: req.params.projectId });
  const run = await db.getRun({ id: req.params.runId }, project);
  return run || res.code(404).send("null");
});

fastify.post(
  "/api/projects/:projectId/runs",
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
  "/api/projects/:projectId/runs/:id/specs",
  async (req: Api.UpdateRunSpecRequest) => {
    const { spec, machineId, result } = req.body;
    const { id, projectId } = req.params;

    return db.updateRunResult({ id, projectId, machineId, spec, result });
  }
);

const start = async () => {
  await fastify
    .listen(3001, "0.0.0.0")
    .then(address => {
      console.log("Server listening on ", address);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};

start();
