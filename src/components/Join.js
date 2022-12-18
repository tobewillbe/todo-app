import React, {useState} from "react";
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";

import {API_BASE_URL} from "../config/host-config";
const Join = () => {

    // 입력 정보 상태관리
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    // 검증 메세지 상태관리
    const [msg, setMsg] = useState({
        username: '',
        email: '',
        password: ''
    });
    // 검증 완료 상태관리
    const [validate, setValidate] = useState({
        username: false,
        email: false,
        password: false
    });

    //회원 이름을 입력처리하는 이벤트 핸들러
    const nameHandler = e =>{
        // console.log(e.target.value);
        // 이름이 정확하게 쓰여진 이름인가?- 검증
        const nameRegex = /^[가-힣]{2,8}$/;
        let message; // 입력상황메시지
        if (!e.target.value){ // 유저네임을 안적음
            message = '유저이름은 필수값입니다.';
            setValidate({...validate, username: false});
        } else if (!nameRegex.test(e.target.value)) { // 이름은 2~8글자사이 한글로만
            message = '유저이름은 2~8글자사이 한글로만 가능합니다.';
            setValidate({...validate, username: false});
        } else {
            message = '사용가능한 이름입니다.';
            setValidate({...validate, username: true});
        }

        // console.log(message);
        setMsg({...msg, username: message})
        setUser({...user, username: e.target.value})
    };



    const passwordHandler = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidate({...validate, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자, 영문자 를 포함해주세요!';
            setValidate({...validate, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidate({...validate, password: true});
        }
        setMsg({...msg, password: message});

        setUser({...user, password: e.target.value})

    };

    // 이메일 중복확인 서버통신
    const checkEmail = (email) => {
        let message;
        fetch(`${API_BASE_URL}/auth/check?email=${email}`)
            .then(res => res.json())
            .then(flag => {
                if(flag){
                    message = '중복된 이메일 입니다.';
                    setValidate({...validate, email: false});
                }else {
                    message = '사용가능한 이메일 입니다.';
                    setValidate({...validate, email: true});
                }
                setMsg({...msg, email: message});
            })
    };

    // 이메일 입력 검증
    const emailHandler = (e) => {
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        setUser({...user, email: e.target.value})
        let message;
        if (!e.target.value) {
            message = '이메일은 필수값입니다!';
            setValidate({...validate, email: false});
        } else if (!emailRegex.test(e.target.value)) {
            message = '이메일 형식이 아닙니다!';
            setValidate({...validate, email: false});
        } else {
            checkEmail(e.target.value);
        }
        setMsg({...msg, email: message});
        setUser({...user, email: e.target.value})
    };
    // 상태변수 validate 내부값이 모두 true인지 확인
    const isValid = () =>{
        for (let key in validate){
            if(!validate[key]){return false;}
        }
        return true;
    };
    const joinHandler = e => {
        // 회원입력정보를 모두 읽어서 서버에 요청

        if(isValid()) {
            fetch(API_BASE_URL + '/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            .then(res=>{
                if (res.status === 200) {
                    alert('회원가입을 축하합니다.');
                    window.location.href='/login';
                }else{
                    alert('서버에 문제가 생겼습니다. 다음에 다시 시도하세요 쏴리~');
                }
            })
        }else{
            alert('입력란을 다시 확인하세요!');
        }
    };

    return(
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={joinHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            onChange={nameHandler}
                        />
                        <span style={validate.username? {color:"green"} : {color:"red"} }> {msg.username} </span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                            onChange={emailHandler}
                        />
                        <span style={validate.email? {color:"green"} : {color:"red"} }> {msg.email} </span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordHandler}
                        />
                        <span style={validate.password? {color:"green"} : {color:"red"} }> {msg.password} </span>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인 하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Join;