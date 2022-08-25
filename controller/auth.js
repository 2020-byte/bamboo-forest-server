import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';

//TODO: Make it secure!
const jwtSecretKey = 'qweruiop56781234';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
    const { username, email, password} = req.body;
    console.log(req.body);
    const foundEmail = await userRepository.findByEmail(email);
    const foundUsername = await userRepository.findByUsername(username);
    if (foundEmail || foundUsername) {
        return res.status(409).json({message: `${username} already exists`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    //console.log(hashed);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        email,
    });

    const token = createJwtToken(userId);
    res.status(201).json({token, username, userId});
}

//회원 가입할 때, 보내준 비밀번호를 암호화시켜서 서버에 저장해놓는다,
//따라서, 회원가입하면은 user:{id, username, 해시된 password, email} 정보가 서버에 저장되고,
//user.id를 토큰으로 클라이언트에 보낸다.

export async function login(req, res) {
    const {email, password} = req.body;
    const user = await userRepository.findByEmail(email);
    console.log(user);
    if(!user) {
        return res.status(401).json({message: 'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({message: 'Invalid user or password'});
    }
    const id = user.id
    const token = createJwtToken(id); 
    res.status(200).json({token, email, id});
}
//로그인 했을 때, 사용자가 제공한 username이 존재하면 사용자가 제공한 password가 맞는 지 서버에 저장된 해시된 비밀번호와 비교 후,
//맞으면 그 username과 password와 함께 묶여 user:{id, username, 해시된 password, email}에 
//저장되 있는 user.id를 토큰으로 클라이언트에 보낸다.

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}

export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found'});
    }
    res.status(200).json({ token: req.token, username: user.username, id: user.id});
}
//   /me로 get요청을 받으면 isAuth에서 id가 존재하는 지 확인 후 여기 me로 와서 username도 응답에 보내 주는 거.