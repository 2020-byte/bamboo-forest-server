// let posts = [
//     {
//         id: '1',
//         userId: '1',
//         anonymous: "yes",
//         category: 'history',
//         title: 'test1',
//         likes: 56,
//         createdAt: '6:00',
//         text: 'this is test1.',
//         views: '1',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
//         id: '2',
//         userId: '1',
//         anonymous: "yes",
//         category: 'notification',
//         title: 'test2',
//         likes: 526,
//         createdAt: '7:00',
//         text: 'this is test2.',
//         views: '1',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
//         id: '3',
//         userId: '1',
//         anonymous: "no",
//         sername: 'tester3',
//         category: 'bookmark',
//         title: 'test3',
//         likes: 56324,
//         createdAt: '8:00',
//         text: 'this is test3.',
//         views: '1',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
//         id: '4',
//         userId: '1',
//         anonymous: "no",
//         category: 'history',
//         title: 'test4',
//         likes: 2362323,
//         createdAt: '3:00',
//         text: 'this is test4.',
//         views: '1',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
//         id: '5',
//         userId: '1',
//         anonymous: "yes",
//         category: 'history',
//         title: 'test5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
//         likes: 2,
//         createdAt: '2:00',
//         text: 'this is test5. longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
//         views: '1',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
        
//         id: '6',
//         userId: '1',
//         anonymous: "no",
//         category: 'notification',
//         title: 'whale is testing',
//         likes: '25',
//         createdAt: new Date().toString(),
//         text: "Whale Whale Whale Whale Whale",
//         views: '34',
//         postingPeriod: true,
//         comment: true,
//         profanity: true,
//         sex: false,
//     },
//     {
//         id: '7',
//         userId: '2',
//         anonymous: "yes",
//         category: 'confession',
//         title: 'Shark is testing',
//         likes: '50',
//         createdAt: new Date().toString(),
//         text: "Shark Shark Shark Shark Shark",
//         views: '90',
//         postingPeriod: false,
//         comment: false,
//         profanity: false,
//         sex: true,
//     },
// ];


import * as userRepository from './auth.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;


const Post = sequelize.define('post', {//post라고 하면 table이름이 아라서 posts가 되네 mysql에서
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postingPeriod: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    comment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    profanity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});
Post.belongsTo(User);

const INCLUDE_USER = {
    attributes: [
        'id',
        'anonymous',
        'category',
        'title',
        'text',
        'postingPeriod',
        'comment',
        'profanity',
        'sex',
        'updatedAt',
        'userId',
        [Sequelize.col('user.username'), 'username'],
    ],
    include: {
        model: User,
        attributes: [],
    },
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']],
}

//같은 단어 한꺼번에 클릭 crt + shift + l
export async function getAll() {
    return Post.findAll({ //배열 추가할 때 ...앞에 붙이기
        ...INCLUDE_USER,
        ...ORDER_DESC, 
    })  
    //그냥 이렇게 하면 promise 결과값이 나오게 되어있나?
    // findAll은 sequelize 모델 데이터 Model Data 배열의 Promise를 리턴해 준답니다 :)

    // 여기서 모델은 데이터버에스에 들어있는 데이터 한 열을 나타낼 수 있는 클래스 형태로 쓸 수 있어요 :) (트윗의 모든 데이터가 들어있죠)

    // 여기 한번 읽어 보세요:

    // https://sequelize.org/master/class/lib/model.js~Model.html

    
    
    
    
    // .then((data) => {
    //     console.log(data);
    //     return data;
    // });
    
    // // return posts; user정보가 post에 이제 userId밖에 없으니
    // // posts를 돌면서 userId를 통해서 각 post를 쓴 user의 정보를 가져와서 
    // //합쳐서 return 해야함
    // return Promise.all(
    //     posts.map(async (post) => {
    //         const { username } = await userRepository.findById(
    //             post.userId
    //         );
    //         return {...post, username};
    //     })  //then을 return. getAll.then()으로 쓰일꺼임.
    // );
}

export async function getAllByCategory(category) {
    return Post.findAll({
        ...INCLUDE_USER,
        ...ORDER_DESC,
        where: { category },
    });
    // // return posts.filter((p) => p.category === category)
    // //getAll().then(posts => posts.map(post => console.log(post)));
    // const postsByCategory = getAll().then((posts) => 
    //     posts.filter((post) => post.category === category)
    // );//arrow function (()=> {})이렇게 하면 안에 return 넣어줘야지 (()=> {return    })처럼.
    // //아니면 function (() => ) 이렇게 하던지.
    // return postsByCategory;
}

export async function getById(id) {
    return Post.findOne({
        ...INCLUDE_USER,
        where: {id},
    })  //데이터베이스를 이용하면 예외적인 걸 데이터베이스에서 처리해주니까 일이 수월해지네.

    // // return posts.find((p) => p.id === id);
    // //getAll로 모드 post를 user정보와 합친 다음에 가져오지 않고
    // //먼저 특정 user id를 가진 post를 찾고 그것만 user정보와 합쳐서 return
    // console.log(id);
    // console.log(posts);
    // const found = posts.find((post) => post.id === id);
    // if(!found) {
    //     return null;
    // }
    // //console.log(found);
    // const { username } = await userRepository.findById(found.userId);
    // //console.log(username);
    // return {...found, username};
}

export async function create(post) {

    console.log(post);
    return Post.create(post) //create에 함수에 post자체가 배열로 들어왔으니 {}로 묶으면 안되지.
            .then((data) => getById(data.dataValues.id));
            //create하면서 데이터베이스에서 따로 추가해준 id를 가지고
            //getById를 통해 임의의로 정해둔 원하는 post의 정보를 가져오는 것
            //Post.findOne({...INCLUDE_USER,where: {id},})

    
    // //console.log(userId+" data");
    // const post = {
    //     id: Date.now().toString(),
    //     anonymous,
    //     userId,
    //     title,
    //     text,
    //     category,
    //     postingPeriod, 
    //     comment, 
    //     profanity, 
    //     sex,
    // };
    // //console.log(posts);
    // posts = [post, ...posts];
    // //user정보배고 userId만 post 정보에 넣어주고(데이터베이스에서 새로 만든 post정보 저장 할 때), 
    // return getById(post.id);    //꺼낼 때 userId를 가지고 다시 합침
}



export async function update(id, anonymous, title, text, category, postingPeriod, comment, profanity, sex) {
    return Post.findByPk(id, INCLUDE_USER)  //이게 findByPk쓰는 방법인듯. sequelize 문법알아보기.
        .then((post) => {
            post.anonymous = anonymous;
            post.title = title;
            post.text = text;
            post.postingPeriod = postingPeriod;
            post.comment = comment;
            post.profanity = profanity;
            post.sex = sex;
            post.category = category;
            console.log(post.dataValues);
            return post.save(); //save작동 안됫떤 이유는 update할 때 새로운 값이 될 받아온 anonymous(string('no'))가 데이터베이스 anonymous(boolean)의 타입이랑 달랐음.
            //return post.dataValues;
            //sequlize 문법 save 저장한 자기 자신을 return함.
        })
    // const post = posts.find(p => p.id === id);
    // //post id를 통해서 수정할 post를 데이터베이스에서 찾고, 받은 내용들로 그 post 데이터를 수정한 후
    // if (post) {
    //     post.anonymous = anonymous;
    //     post.title = title;
    //     post.text = text;
    //     post.postingPeriod = postingPeriod;
    //     post.comment = comment;
    //     post.profanity = profanity;
    //     post.sex = sex;
    //     post.category = category;
    // }
    // //그 post와 그 post의 user정보를 합쳐서 리턴.
    // return getById(post.id);
}//Unexpeced token in JSON at postion json.parse)<anonymous>) 오류뜨면 json이 전달하는 값중에 누락한 값이 있는 지 원래 데이터베이스랑 비교.

export async function remove(id) {
    return Post.findByPk(id) //
    .then((post) => {
        post.destroy();
    });
    // posts = posts.filter(p => p.id !== id);
}