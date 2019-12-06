import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { colors } from "@workday/canvas-kit-react-core";

import {
  checkSmallIcon,
  xSmallIcon,
  videoIcon,
  cameraPlusIcon
} from "@workday/canvas-system-icons-web";
import {
  SystemIcon,
  IconButton,
  Modal,
  useModal
} from "@workday/canvas-kit-react";
import { CanvasSystemIcon } from "@workday/design-assets-types";
import { Run } from "../server/types";

export interface SpecListProps {
  data: Run;
  filter: (result: Run["results"][0]) => boolean;
}

const Status = styled("div")({
  width: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const StatusPass = styled("div")({
  backgroundColor: colors.greenApple400,
  width: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const SpecContainer = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  borderBottom: `1px solid ${colors.soap400}`
});

const SpecDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 0",
  alignItems: "stretch",
  minWidth: 0,
  padding: 15
});

const SpecListContainer = styled("ul")({
  margin: 0,
  paddingLeft: 0
});

const ErrorMessage = styled("div")({
  color: colors.cinnamon400,
  margin: "20px 0"
});

const FailureActionsContainer = styled("div")({
  display: "inline-flex",
  position: "absolute",
  right: "30px"
});

interface IconModalButtonProps {
  icon: CanvasSystemIcon;
  label: string;
  children: React.ReactNode;
}
const IconModalButton = ({ icon, label, children }: IconModalButtonProps) => {
  const { targetProps, modalProps } = useModal();

  return (
    <>
      <IconButton icon={icon} aria-label={label} {...targetProps} />
      <Modal heading={label} {...modalProps} width={Modal.Width.m}>
        {children}
      </Modal>
    </>
  );
};

class SpecList extends React.Component<SpecListProps, {}> {
  static defaultProps = {
    filter: (result: Run["results"][0]) => true
  };
  public render() {
    var specs = this.props.data.results,
      spec = specs.filter(this.props.filter).map((test, i) => {
        return (
          <SpecContainer>
            <Status
              style={{
                backgroundColor: test.passed
                  ? colors.greenApple400
                  : colors.cinnamon400
              }}
            >
              <SystemIcon
                fillHover={colors.frenchVanilla100}
                fill={colors.frenchVanilla100}
                accent={colors.frenchVanilla100}
                accentHover={colors.frenchVanilla100}
                icon={test.passed ? checkSmallIcon : xSmallIcon}
              />
            </Status>
            <SpecDetails>
              <div>{test.result.spec.name}</div>
              {test.result.error && (
                <ErrorMessage>{test.result.error}</ErrorMessage>
              )}
              {test.passed === false && (
                <FailureActionsContainer>
                  <IconModalButton
                    label="View Screenshot"
                    icon={cameraPlusIcon}
                  >
                    <img
                      src={`/assets/${test.result.screenshots![0].path.replace(
                        /\//g,
                        "%2F"
                      )}`}
                      width={740}
                    />
                  </IconModalButton>
                  <IconModalButton
                    label="View Video Recording"
                    icon={videoIcon}
                  >
                    {test.result.video}
                    <video width={740} controls autoPlay>
                      <source
                        src={`/assets/${test.result.video.replace(
                          /\//g,
                          "%2F"
                        )}`}
                      />
                    </video>
                  </IconModalButton>
                </FailureActionsContainer>
              )}
            </SpecDetails>
          </SpecContainer>
        );
      });

    return <SpecListContainer>{spec}</SpecListContainer>;
  }
}

export default SpecList;
