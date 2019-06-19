import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import StockSearch from "./components/StockSearch";
import Navbar from "./components/Navbar";
import Balance from "./components/Balance";
import NetBalance from "./components/NetBalance";
import { PortfolioRef } from "./firebaseConfig";
import PortfolioTable from "./components/PortfolioTable";
import { Card } from "semantic-ui-react";
import axios from "axios";
import config from "./config";
const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
const AppContainer = styled.div`
  padding: 10vh 30vh;
  @media only screen and (max-width: 600px) {
    padding: 10vh;
  }
`;
const Heading = styled.h1`
  font-size: 18;
`;

class App extends Component {
  state = { balance: "Loading...", purchases: {}, assetValue: 0, currentPrices: {} };

  makePurchase = passedState => {
    const selectedStock = passedState.selectedStock;
    selectedStock["numStocks"] = passedState.numStocks;
    selectedStock["cost"] = passedState.cost;
    selectedStock["time"] = new Date().toUTCString();
    if (selectedStock.value in this.state.purchases) {
      const stockVal = this.state.purchases[selectedStock.value];
      stockVal["numStocks"] = Number(stockVal["numStocks"]) + Number(passedState.numStocks);
      stockVal["cost"] = Number(stockVal["cost"]) + Number(passedState.cost);
      stockVal["time"] = new Date().toUTCString();
      PortfolioRef.child("purchases")
        .child(selectedStock.value)
        .set(stockVal);
    } else {
      PortfolioRef.child("purchases")
        .child(selectedStock.value)
        .set(selectedStock);
    }
    const newBalance = this.state.balance - passedState.cost;
    PortfolioRef.child("balance").set(newBalance);
  };
  updateAssetValue = val => {
    console.log("set to ", val);
    this.setState({
      assetValue: val
    });
  };
  sellAsset = assetName => {
    const assetOfInterest = this.state.purchases[assetName];
    const value = assetOfInterest.numStocks * assetOfInterest.price;
    const newbal = Number(this.state.balance) + value;

    PortfolioRef.child("purchases")
      .child(assetName)
      .remove();
    PortfolioRef.child("balance").set(newbal);
  };

  componentDidMount() {
    PortfolioRef.on("value", async snapshot => {
      console.log("received", snapshot.val());
      const { balance, purchases } = snapshot.val();
      if (purchases) {
        const allStocks = Object.keys(purchases);
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=${
            config.apikey
          }&symbols=${allStocks.join(",")}`
        );
        const results = response.data["Stock Quotes"] || [];
        results.forEach(result => {
          purchases[result["1. symbol"]].price = result["2. price"];
        });
      }

      this.setState({ balance: balance || "", purchases: purchases || {} });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <AppContainer>
          <SearchContainer>
            <Heading>Pick your stock</Heading>
            <StockSearch makePurchase={this.makePurchase} />
          </SearchContainer>
          <SearchContainer>
            <Card.Group style={{ textAlign: "center" }}>
              <Balance initBalance={this.state.balance} />
              <NetBalance initBalance={this.state.balance + this.state.assetValue} />
            </Card.Group>
            <h3>Portfolio</h3>
            <PortfolioTable
              purchases={this.state.purchases}
              updateAssetValue={this.updateAssetValue}
              sellAsset={this.sellAsset}
            />
          </SearchContainer>
        </AppContainer>
      </div>
    );
  }
}

export default App;
