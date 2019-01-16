import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/books/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";
import Filter from "../containers/Filter";

class Books extends Component {
  static async getInitialProps(context) {
    const { input, recommend, userId } = context.query;
    console.log("input", typeof input);

    if (input === "") {
      const books = [];
      return books;
    } else if (recommend) {
      if (userId) {
        const res = await axios.get(`${BACKEND_ENDPOINT}${recommend}`, {
          params: {
            userId: userId
          }
        });
        const books = res.data;
        return {
          books
        };
      } else {
        const res = await axios.get(`${BACKEND_ENDPOINT}${recommend}`);
        const books = res.data;

        return {
          books
        };
      }
    }  else {
      const books = await axios
        .get(`${BACKEND_ENDPOINT}/books/search/title`, {
          params: {
            input: input,
            offset: 0
          }
        })
        .then(res => {
          console.log("res", res.data);
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });

      return {
        books
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate--nextProps", nextProps.books);
    // console.log("shouldComponentUpdate--nextState", nextState.books);
    // console.log("shouldComponentUpdate--thisState", this.state.books);
    if (nextProps.books !== this.state.books) {
      this.setState({
        books: nextProps.books
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log("state", this.state.books)
    return (
      <React.Fragment>
        <Filter />
        <div id="books">
          <div id="books_box">
            {this.state.books ? (
              this.state.books.map((book, index) => {
                return (
                  <Bookcollection book={book} key={index} ID={this.props.ID} />
                );
              })
            ) : (
              <div />
            )}
            {/* {this.state.books.map((book, index) => {
              return (
                <Bookcollection book={book} key={index} ID={this.props.ID} />
              );
            })} */}
          </div>

          <style jsx>{`
            #books {
              background: rgba(0, 0, 0, 0.03);
              padding-top: 60px;
              padding-bottom: 5px;
            }
            #books_box {
              margin: 0 auto;
              max-width: 1140px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              background-color: white;
              border: 1px solid #ddd;
            }
            @media screen and (max-width: 600px) {
              #books_box {
                width: 100%;
              }
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}

export default Books;
