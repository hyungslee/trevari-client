import React from "react";
import App, { Container } from "next/app";
import axios from "axios";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Filter from "../containers/Filter";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      movepage: "/login",
      text: "로그인",
      bookTitle: "",
      isSearching: false,
      bookMarkData: ""
    };

    this.changeCondition = this.changeCondition.bind(this);
    this.rechangeCondition = this.rechangeCondition.bind(this);
    this._changeBookTitle = this._changeBookTitle.bind(this);
    this._receiveBookmark = this._receiveBookmark.bind(this);
    this._changeBookmarkData = this._changeBookmarkData.bind(this);
  }

  changeCondition = () => {
    this.setState({
      movepage: "/index",
      text: "로그아웃"
    });
  };

  rechangeCondition = () => {
    if (this.state.text === "로그아웃") {
      this.setState({
        id: "",
        movepage: "/login",
        text: "로그인",
        bookMarkData: ""
      });
    }
  };

  _changeBookTitle = title => {
    if (title === "") {
      this.setState({
        bookTitle: "",
        isSearching: false
      });
    } else {
      this.setState({
        bookTitle: title,
        isSearching: true
      });
    }
  };

  saveId = loginId => {
    this.setState({
      id: loginId
    });
  };

  _receiveBookmark = user => {
    axios
      .post("http://3.16.58.104:5000/bookmarks/getMyBookmarks", user)
      // .post("http://localhost:5000/users/checkEmailAvailability", data)
      .then(res =>
        this.setState({
          bookMarkData: res.data
        })
      )
      .catch(err => console.log(err));
  };

  _changeBookmarkData = changeData => {
    this.setState({
      bookMarkData: changeData
    })
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log("App.js--Bookmarkdata : ", this.state.bookMarkData);
    return (
      <Container>
        <Header
          loginState={this.state}
          rechangeCondition={this.rechangeCondition}
          ID={this.state.id}
        />
        <Filter _changeBookTitle={this._changeBookTitle} />
        <Component
          {...pageProps}
          ID={this.state.id}
          saveId={this.saveId}
          changeCondition={this.changeCondition}
          isSearching={this.state.isSearching}
          bookTitle={this.state.bookTitle}
          _receiveBookmark={this._receiveBookmark}
          bookMarkData={this.state.bookMarkData}
          _changeBookmarkData={this._changeBookmarkData}
        />
        <Footer />
      </Container>
    );
  }
}
