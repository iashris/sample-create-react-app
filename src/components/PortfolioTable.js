import React, { Component } from "react";
import { Table, Header, Button, Input, Rating } from "semantic-ui-react";
class PortfolioTable extends Component {
  state = { purchases: this.props.purchases || {} };
  componentDidUpdate = (prevProps, prevState) => {
    const { purchases } = this.props;
    const { purchases: prevPurchases } = prevProps;
    if (purchases != prevPurchases) {
      this.setState({
        purchases: this.props.purchases
      });
      const assetValue = Object.values(this.props.purchases).reduce(
        (acc, purchase) => acc + Number(purchase.price) * Number(purchase.numStocks),
        0
      );
      this.props.updateAssetValue(assetValue);
    }
  };
  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
            <Table.HeaderCell>Stock Name</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell>Current Value</Table.HeaderCell>
            <Table.HeaderCell>Net Value</Table.HeaderCell>
            <Table.HeaderCell>Sell</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(this.state.purchases).map((purchase, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>
                  <Header as="h2" textAlign="center">
                    {purchase.key}
                  </Header>
                </Table.Cell>
                <Table.Cell singleLine>{purchase.description}</Table.Cell>
                <Table.Cell>{purchase.numStocks}</Table.Cell>
                <Table.Cell textAlign="right">{purchase.price || 0}</Table.Cell>
                <Table.Cell textAlign="right">
                  {parseInt(100 * (purchase.price || 0) * Number(purchase.numStocks)) / 100}
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => this.props.sellAsset(purchase.key)}>Sell</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default PortfolioTable;
