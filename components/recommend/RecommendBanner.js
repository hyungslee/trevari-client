import Link from "next/link";
import React, { Component } from 'react';

class RecommendBanner extends Component {
  _getBookImage = (image) => {
    const getBookImage = image;
    for (let i = 0; i < getBookImage.length; i++) {
      if (getBookImage[i] === "?") {
        const changeBookImage = getBookImage.slice(0, i);
        return changeBookImage;
      }
    }
    return getBookImage;
  };

  render() {
    return (
      <div id="recommend_banner">
      <div id="recommend_banner-gradient">
        <div className="recommend_banner_box">
          <div className="recommend_banner_top">
            <div className="recommend_banner_titlebox">
              <div className="recommend_banner_titlebox_title">
                트레바리 베스트셀러
              </div>
              <div className="recommend_banner_titlebox_title">TOP 3</div>
            </div>
            <div className="recommend_banner_booksbox">
              <div className="recommend_banner_books">
                <div className="recommend_banner_books_book1">
                  <div>
                    <div className="recommend_banner_books_book_best">TOP</div>
                    <div className="recommend_banner_books_book_best">2</div>
                  </div>
                  <Link
                    as={`/book/${this.props.top[1].id}`}
                    href={{
                      pathname: "/book",
                      query: { id: this.props.top[1].id, ID: this.props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book1_img1">
                      <img src={this._getBookImage(this.props.top[1].image)} />
                    </div>
                  </Link>
                </div>
                <div className="recommend_banner_books_book2">
                  <div>
                    <div className="recommend_banner_books_book_best">TOP</div>
                    <div className="recommend_banner_books_book_best">1</div>
                  </div>
                  <Link
                    as={`/book/${this.props.top[0].id}`}
                    href={{
                      pathname: "/book",
                      query: { id: this.props.top[0].id, ID: this.props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book2_img2">
                      <img src={this._getBookImage(this.props.top[0].image)} />
                    </div>
                  </Link>
                </div>
                <div className="recommend_banner_books_book3">
                  <div>
                    <div className="recommend_banner_books_book_best">TOP</div>
                    <div className="recommend_banner_books_book_best"> 3</div>
                  </div>
                  <Link
                    as={`/book/${this.props.top[2].id}`}
                    href={{
                      pathname: "/book",
                      query: { id: this.props.top[2].id, ID: this.props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book3_img3">
                      <img src={this._getBookImage(this.props.top[2].image)} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="recommend_banner_bottom">
          <div className="recommend_banner_nextbox">
            <div className="recommend_banner_nextbox_next">OOOO</div>
          </div>
        </div> */}
      </div>
      <style jsx>{`
        #recommend_banner {
          width: 100%;
          height: 400px;
          background: url(http://image.trevari.co.kr/landing/top.jpg) center
            center / cover no-repeat;
        }
        #recommend_banner-gradient {
          background-color: rgba(0, 0, 0, 0.7);
          width: 100%;
          height: 100%;
        }
        .recommend_banner_box {
          max-width: 1140px;
          height: 100%;
          margin: 0 auto;
          z-index: 0;
        }
        .recommend_banner_top {
          display: flex;
          justify-content: space-around;
          height: 100%;
        }
        .recommend_banner_bottom {
        }
        .recommend_banner_titlebox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .recommend_banner_titlebox_title {
          font-size: 35px;
          font-weight: 700;
          color: white;
        }
        .recommend_banner_booksbox {
        }
        .recommend_banner_books {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .recommend_banner_books_book1 {
          width: 150px;
        }
        .recommend_banner_books_book2 {
          margin-left: 40px;
          margin-right: 40px;
          width: 180px;
        }
        .recommend_banner_books_book3 {
          width: 150px;
        }
        .recommend_banner_books_book1_img1 {
          width: 100%;
          height: 200px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book2_img2 {
          width: 100%;
          height: 250px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book3_img3 {
          width: 100%;
          height: 200px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book_best {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          font-size: 18px;
          font-weight: 700;
        }
        .recommend_banner_nextbox {
          border: solid 1px #ddd;
          display: flex;
          justify-content: flex-end;
        }
        img {
          width: 100%;
          height: 100%;
        }
        @media screen and (max-width: 600px) {
          #recommend_banner {
            display: none;
          }
          // .recommend_banner_box {
          //   width: 100%;
          // }
          // .recommend_banner_books_book1 {
          //   width: 100px;
          // }
          // .recommend_banner_books_book2 {
          //   margin-left: 10px;
          //   margin-right: 10px;
          //   width: 100px;
          // }
          // .recommend_banner_books_book3 {
          //   width: 100px;
          // }
        }
      `}</style>
    </div>
    );
  }
}

export default RecommendBanner;
