import React from "react";
import { Dropdown, Header, Table, Input, Button } from "semantic-ui-react";
import axios from "axios";
import config from "../config";
import { PortfolioRef } from "../firebaseConfig";
class StockSearch extends React.Component {
  state = { options: [], stock: "", stockSelected: false, numStocks: 0, cost: 0 };
  handleSelectChange = (e, { value }) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${value}&apikey=${
          config.apikey
        }`
      )
      .then(response => {
        const results = response.data["Global Quote"];
        this.setState({
          stockSelected: true,
          selectedStock: this.state.options.filter(option => option.value == value)[0],
          price: results ? results["05. price"] : 1000
        });
      });
  };
  onSearchChange = (e, value) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          value.searchQuery
        }&apikey=${config.apikey}`
      )
      .then(response => {
        const results = response.data.bestMatches;
        let mappedResults = [];
        if (results)
          mappedResults = results.map(entry => {
            return {
              key: entry["1. symbol"],
              value: entry["1. symbol"],
              description: entry["2. name"],
              text: entry["1. symbol"],
              region: entry["4. region"]
            };
          });

        this.setState({ options: mappedResults });
      });
  };
  enterStocks = event => {
    const val = event.target.value;
    if (isNaN(val)) return;
    this.setState({
      numStocks: val,
      cost: val * this.state.price
    });
  };
  render() {
    return (
      <div>
        <Dropdown
          onSearchChange={this.onSearchChange}
          search
          selection
          fluid
          placeholder="Search for your stock..."
          options={this.state.options}
          onChange={this.handleSelectChange}
        />
        {this.state.stockSelected && (
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Stock Symbol</Table.HeaderCell>
                <Table.HeaderCell>Stock Name</Table.HeaderCell>
                <Table.HeaderCell>Region</Table.HeaderCell>
                <Table.HeaderCell>Market Price</Table.HeaderCell>
                <Table.HeaderCell>Shares to Purchase</Table.HeaderCell>
                <Table.HeaderCell>Buy</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h2" textAlign="center">
                    {this.state.selectedStock.value}
                  </Header>
                </Table.Cell>
                <Table.Cell singleLine>{this.state.selectedStock.description}</Table.Cell>
                <Table.Cell>{this.state.selectedStock.region}</Table.Cell>
                <Table.Cell>{this.state.price}</Table.Cell>
                <Table.Cell>
                  <Input value={this.state.numStocks} onChange={this.enterStocks} />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      this.props.makePurchase(this.state);
                      this.setState({
                        numStocks: 0,
                        stockSelected: false
                      });
                    }}>
                    Purchase for {parseInt(this.state.price * this.state.numStocks)}
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

export default StockSearch;
