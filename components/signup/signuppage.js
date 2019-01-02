import React, { Component } from "react";
import axios from "axios";
import { Router } from "../../routes/routes";

class signuppage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      repassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signupButtonClick = this.signupButtonClick.bind(this);
    this.checkRegisteredEmail = this.checkRegisteredEmail.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  email_check = email => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regex.test(email)) {
      console.log("[-] Not email!!!");
      return false;
    } else {
      console.log("[+] email OK!");
      return true;
    }
  };

  password_check = (pw, repw) => {
    if (pw !== repw) {
      console.log("[-] Not match PW!!!");
      return false;
    } else {
      console.log("[+] password OK!");
      return true;
    }
  };

  signupButtonClick = () => {
    for (var key in this.state) {
      if (this.state[key] === "") {
        console.log(`[-] ${key} is Empty`);
        return;
      }
    }
    if (!this.email_check(this.state.email)) {
      return;
    }
    if (!this.password_check(this.state.password, this.state.repassword)) {
      return;
    }
    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = () => {
    const data = {
      email: this.state.email
    };
    axios
      //   .post("http://3.16.58.104:5000/users/checkEmailAvailability", data)
      .post("http://localhost:5000/users/checkEmailAvailability", data)
      .then(res =>
        res.data
          ? this.requestSignup(data)
          : console.log("[-] Already Registered your email!")
      )
      .catch(err => console.log(err));
  };

  requestSignup = () => {
    var data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    axios
      //   .post("http://3.16.58.104:5000/users/signup", data)
      .post("http://localhost:5000/users/signup", data)
      .then(res => {
        res.data
          ? Router.pushRoute("/login")
          : console.log("[-] Sign up fail!!");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div>
          <h1>회원가입</h1>
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <a>* 이메일 형식 확인</a>
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            placeholder="repassword"
            type="password"
            name="repassword"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <a>* 비밀번호 확인</a>
        </div>
        <div>
          <input placeholder="name" name="name" onChange={this.handleChange} />
        </div>
        <div>
          <input
            placeholder="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <a>* 숫자만 입력 가능</a>
        </div>
        <button onClick={this.signupButtonClick}>Signup</button>
      </div>
    );
  }
}

export default signuppage;