import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const Reset = createGlobalStyle`
  ${reset};

  input { 
    margin: 0;
    padding: 0;
  }
`;

export default Reset;
