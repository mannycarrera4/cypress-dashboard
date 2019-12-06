import React from "react";
import Header from "./Header";
import SpecView from "./SpecView";
import { colors } from "@workday/canvas-kit-react-core";
import styled from "@emotion/styled";
import "./App.css";

const ContentContainer = styled("div")({
  backgroundColor: colors.soap200,
  overflowY: "scroll"
});
const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <ContentContainer>
        <SpecView id={"11"} />
      </ContentContainer>
    </div>
  );
};

export default App;
