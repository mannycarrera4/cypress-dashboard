import React from "react";
import styled from "@emotion/styled";
import { spacing, H4 } from "@workday/canvas-kit-react-core";

import Card from "@workday/canvas-kit-react-card";
import Tabs from "./Tabs";
import SpecList from "./SpecList";
import FailList from "./FailList";
import { extLinkIcon } from "@workday/canvas-system-icons-web";
import { SystemIcon } from "@workday/canvas-kit-react-icon";

import { Run } from "../server/types";

// const allSpecData = {
//   specs: {
//     total: [
//       {
//         testName: "Modal.spec.tsx",
//         passed: true
//       },
//       {
//         testName: "Button.spec.tsx",
//         passed: true
//       }
//     ]
//   }
// };

// const failSpecData = {
//   specs: {
//     total: [
//       {
//         testName: "SidePanel.spec.tsx",
//         passed: false
//       },
//       {
//         testName: "FormField.spec.tsx",
//         passed: false,
//         errorMessage:
//           "Timed out retrying: expected '<div.css-p94cei-Popup__Container.ele5ym80>' not to be 'visible"
//       }
//     ]
//   }
// };

const Container = styled("div")({
  margin: "0 10%",
  paddingTop: 30,
  textAlign: "left"
});

const RunNumber = styled("div")({
  fontSize: "24",
  fontWeight: 700,
  // textDecoration: 'all'
  color: "rgb(94, 106, 117)",
  marginBottom: 20
});

const SpecView: React.FC<{ id: string }> = ({ id }) => {
  const [run, setRun] = React.useState<Run | null>(null);
  React.useEffect(() => {
    fetch("/api/projects/1234/runs/11")
      .then(response => response.json() as Promise<Run>)
      .then(run => setRun(run));
  }, []);

  const data = {
    points: {
      total: [
        {
          id: 1,
          name: "tab-1",
          text: "Spec",
          passed: true,
          content: () => (run ? <SpecList data={run} /> : null)
        },
        {
          id: 2,
          name: "tab-2",
          text: "Failures",
          passed: true,
          content: () =>
            run ? <FailList data={run} filter={r => !r.passed} /> : null
        }
      ]
    }
  };

  return (
    <Container>
      <RunNumber>
        <a>RUN #{id}</a>
      </RunNumber>
      <Card padding={spacing.zero} style={{ border: "none" }}>
        <Tabs data={data} />
      </Card>
    </Container>
  );
};

export default SpecView;
