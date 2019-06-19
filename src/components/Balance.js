import React, { Component } from "react";
import { Button, Card, Header, Modal, Input } from "semantic-ui-react";
import styled from "styled-components";
import { PortfolioRef } from "../firebaseConfig";
const BalanceText = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin: 40px;
`;
class Balance extends Component {
  state = {
    balance: this.props.initBalance,
    input: "",
    isLoading: false,
    showWithdrawModal: false,
    showDepositModal: false
  };
  resetInput = () => {
    this.setState({
      input: "",
      showWithdrawModal: false,
      showDepositModal: false
    });
  };
  attemptDeposit = () => {
    if (isNaN(this.state.input)) {
      alert("Invalid input.");
      return;
    }
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState(prevState => ({
        balance: prevState.balance + Number(this.state.input),
        isLoading: false
      }));
      PortfolioRef.child("balance").set(this.state.balance);
      this.resetInput();
    }, 1500);
  };
  attemptWithdrawal = () => {
    if (isNaN(this.state.input)) {
      alert("Invalid input.");
      return;
    }
    if (Number(this.state.input) > this.state.balance) {
      alert("Cannot withdraw more than your balance.");
      return;
    }
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      this.setState(prevState => ({
        balance: prevState.balance - Number(this.state.input),
        isLoading: false
      }));
      PortfolioRef.child("balance").set(this.state.balance);
      this.resetInput();
    }, 1500);
  };
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
          <Card.Header style={{ marginBottom: "30px" }}>Available Balance</Card.Header>
          <Card.Description>
            <BalanceText>{parseInt(this.state.balance * 100) / 100 || "Loading..."}</BalanceText>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Modal
              open={this.state.showDepositModal}
              trigger={
                <Button onClick={() => this.setState({ showDepositModal: true })}>Deposit</Button>
              }
              onClose={this.resetInput}>
              <Modal.Header>Deposit Funds</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Input
                    action={{
                      color: "teal",
                      labelPosition: "left",
                      icon: "cart",
                      content: "Deposit",
                      onClick: () => this.attemptDeposit()
                    }}
                    actionPosition="left"
                    placeholder="Search..."
                    loading={this.state.isLoading}
                    value={this.state.input}
                    onChange={event => this.setState({ input: event.target.value })}
                  />
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Modal
              open={this.state.showWithdrawModal}
              trigger={
                <Button onClick={() => this.setState({ showWithdrawModal: true })}>Withdraw</Button>
              }
              onClose={this.resetInput}>
              <Modal.Header>Withdraw Funds</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Input
                    action={{
                      color: "teal",
                      labelPosition: "left",
                      icon: "cart",
                      content: "Withdraw",
                      onClick: () => this.attemptWithdrawal()
                    }}
                    actionPosition="left"
                    placeholder="Search..."
                    loading={this.state.isLoading}
                    value={this.state.input}
                    onChange={event => this.setState({ input: event.target.value })}
                  />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default Balance;
