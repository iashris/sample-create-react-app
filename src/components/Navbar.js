import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 20px 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #212a42;
  color: white;
`;
const LogoName = styled.span`
  font-size: 28px;
`;
const Username = styled.span`
  font-size: 16px;
`;
class Navbar extends React.Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <LogoName>Qwilio</LogoName>
        <Username>Hi Ashris!</Username>
      </Wrapper>
    );
  }
}

export default Navbar;
