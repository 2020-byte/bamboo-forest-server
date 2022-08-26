// //abcd1234! $2b$12$lYxmN8Dgv7iBelrutKPYUeS7gc5g4ITPv6AjwPnRh/sy8OSuFqa6G

// let users = [
//     {
//         userId: '1',
//         username: 'catt',
//         password: '$2b$12$lYxmN8Dgv7iBelrutKPYUeS7gc5g4ITPv6AjwPnRh/sy8OSuFqa6G',
//         email: 'cat@student.ubc.ca',
//     },
//     {
//         userId: '2',
//         username: 'dogg',
//         password: '$2b$12$LYButVbQ.uOyBViqcdECC.LEf6D2c/KoTzZKioIoSe1Mcz351cFDS',
//         email: 'dog@student.ubc.ca',
//     }
// ]
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    { timestamps: false}
);



export async function findByEmail(email) {
    return User.findOne({ where: { email } });
    // console.log(email);
    // return users.find((user) => user.email === email);
}

export async function findByUsername(username) {    //Sign up 할 때, 같은 username 이미 머저 있는 지 확인해야함.
    return User.findOne({ where: { username } });
    // return users.find((user) => user.username === username);
}


export async function findById(id) {//bob userId가 uersId라고 되있었음. 논리적으로 다 맞을 때 무조건 관련된거 오타찾기.
    return User.findByPk(id);
    // //console.log(users);
    // const user = users.find((user) => user.userId === userId);
    // return user;
}

export async function createUser(user) {
    console.log(user);
    return User.create(user).then((data) => data.dataValues.id);
    // const created = {...user, userId: Date.now().toString()};//id가 이렇게 나오니 단순한 1,2,~7인 userId랑 당연히 다르고 그러면 post랑 user정보 합치지 못하지. 일단은 모든 post의 userId를 1과 2로하고 1,2를 userId로 가진 user 2명을 각 각 데이터베이스에 넣어놓자. 새로 가입하면 date id나오니까.
    // users.push(created);
    // //console.log(users);
    // return created.userId;
}

