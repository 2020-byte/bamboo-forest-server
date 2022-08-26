import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error'};

export const isAuth = async (req, res, next) => {   //isAuth는 header에 authorization이 있는 지, 있다면 검증할 수 있는 jwt를 가졌는지, jwt에서 검증되었더라도 실제로 그 사용자가 우리 데이터베이스에 있는 지 까지 확인. 
    const authHeader = req.get('Authorization');
    
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }
    


    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            console.log(decoded);
            const user = await userRepository.findById(decoded.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            
            req.userId = user.id;   //;;;userId라고 오타냈었네    
            //isAuth는 미들웨어임.
            //이거 isAuth 요청 다음에 뒤를 잇는 또 다른 요청들이 있잖아.
            //auth 판별이 된 후 있다면 그 user의 id를 req.userId에 담고,
            //그 다음 요청들에서 req.userId을 가지고 요청 접근권한이 확인되는 듯.
            next();
        }
    )
}

