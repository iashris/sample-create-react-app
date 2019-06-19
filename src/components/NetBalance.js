import React, { Component } from "react";
import { Button, Card, Header, Modal, Input } from "semantic-ui-react";
import styled from "styled-components";
import { PortfolioRef } from "../firebaseConfig";
const BalanceText = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin: 40px;
`;
class NetBalance extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    if (this.props.initBalance != prevProps.initBalance) {
      this.setState({
        balance: this.props.initBalance
      });
    }
  }
  render() {
    return (
      <Card style={{ background: "white" }}>
        <Card.Content>
          <Card.Header style={{ marginBottom: "30px" }}>Net Portfolio Value</Card.Header>
          <Card.Description>
            <BalanceText>{parseInt(this.state.balance * 100) / 100 || "Loading..."}</BalanceText>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default NetBalance;
