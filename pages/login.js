import Link from 'next/link';

const Login = (props) => {
  return (
    <div id="login">

      <div id="login_box">
        <h1>로그인</h1>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>

      <style jsx>{`
          #login {
            
          }
          #login_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #login_box {
              width: 100%;
            }
          }
      `}</style>

    </div>
  );
};

export default Login;