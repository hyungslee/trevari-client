import React from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class ReviewItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: "none"
    }
  }
  

  showModal = () => {
    this.setState({
      modalStatus: "block"
    })
  }

  closeModal = () => {
    this.setState({
      modalStatus: "none"
    })
  }

  getBookImage = () => {
    const bareImage = JSON.stringify(this.props.review.Book.image);
    let bookImageURL;
    for (var i = 0; i < bareImage.length; i++) {
      if (bareImage[i] === "?") {
        bookImageURL = bareImage.slice(1, i);
      }
    }
    return bookImageURL;
  };

  getDate = () => {
    const bareDate = JSON.stringify(this.props.review.createdAt);

    let year = bareDate.slice(1, 5);
    let month = bareDate.slice(6, 8);
    let day = bareDate.slice(9, 11);
    let time = bareDate.slice(12, 14);
    let minute = bareDate.slice(15, 17);
    let second = bareDate.slice(18, 20);
    let newDate = `${year}년 ${month}월 ${day}일  ${time}시 ${minute}분 ${second}초`;

    return newDate;
  };

  deleteBtn_handler = () => {
    const review = this.props.review;
    const deleteReview = this.props.deleteReview;

    deleteReview(review);

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/deleteReview`, {
        userId: review.user_id,
        bookId: review.book_id
      })
      .then(res => {
        if (res.data) {
          console.log(`삭제된 리뷰 : ${review.Book.title}`);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const review = this.props.review;

    return (
      <div id="content">
        <div id="basicContent">
          <div id="outerContent">
            <Link
              as={`/book/${review.book_id}`}
              href={`/book?id=${review.book_id}`}
            >
              <div className="imageContainer">
                <img
                  src={this.getBookImage()}
                  className="oneImage"
                  align="center"
                />
              </div>
            </Link>
            <div className="myRate" align="center">
              내가 준 평점 : {review.score}
            </div>
            <div className="averageRate" align="center">
              평균 평점 : {review.Book.averageScore}
            </div>
            <div>
              <button className="deleteBtn" onClick={this.deleteBtn_handler}>
                삭제
              </button>
            </div>
          </div>

          <div id="innerContent">
            <div className="name" type="text">
              {review.Book.title}
            </div>
            <div className="date" type="text">
              작성시간 : {this.getDate()}
            </div>
            <div className="summary" type="text	7">
              {review.text}
            </div>
            <div>
              <button className="editReviewBtn" onClick={this.showModal} >수정하기</button>
            </div>
          </div>
          <EditReview closeModal={this.closeModal} modalStatus={this.state.modalStatus}/>
        </div>
        <style jsx>{`
          #content {
            display: flex;
            flex-direction: column;
            background: #fff3e8;
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 0px 0px 0px 1px red;
          }
          #basicContent {
            display: flex;
          }
          #content,
          #outerContent,
          .imageContainer,
          .deleteBtn,
          .myRate,
          .averageRate {
            box-shadow: 0px 0px 0px 1px black;
          }
          #innerContent,
          .name,
          .date,
          .summary {
            box-shadow: 0px 0px 0px 1px red;
          }
          #hideContent, 
          .editContainer, 
          .editReview, 
          .editReviewBtn {
            box-shadow: 0px 0px 0px 1px blue;
          }
          #outerContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #fcfbf9;
            margin-left: 10px;
          }
          .imageContainer {
            width: 150px;
            margin: auto;
          }
          .oneImage {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 100%;
          }
          .myRate {
            margin: 15px 0px 10px 0px;
          }
          .averageRate {
            margin: 0px 0px 10px 0px;
          }
          .deleteBtn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
          }
          #innerContent {
            margin-left: 10px;
            margin-right: 10px;
          }
          .name {
            background: ;
            margin-top: 10px;
            font-size: 25px;
            height: 15%;
            font-weight: bold;
            text-align: center;
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            height: 5%;
            color: grey;
          }
          .summary {
            background: ;
            margin-top: 15px;
            height: 50%;
            overflow: scroll;
          }
          .editReviewBtn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
          }
          #hideContent {
            display: flex;
            flex-direction: column;
          }
          .editContainer {
            margin: 10px;
            height: 150px;
          }
          .editReview {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
            height: 100px;
          }
  
          @media (max-width: 800px) {
            .container {
              display: flex;
              flex-direction: column;
            }
            #content {
              display: flex;
              flex-direction: column;
              background: ;
              margin-bottom: 20px;
            }
            #basicContent {
              display: flex;
              flex-direction: column;
            }

            #content,
            .imageContainer,
            .name,
            .summary {
              border: solid 1px #ced4da;
            }
            #outerContent {
              background: ;
            }
            .oneImage {
              display: block;
              margin: auto;
            }
            .name {
              background: ;
            }
            .summary {
              background: ;
              height: 50%;
              overflow: scroll;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ReviewItem;
