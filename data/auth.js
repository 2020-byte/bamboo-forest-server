//abcd1234! $2b$12$lYxmN8Dgv7iBelrutKPYUeS7gc5g4ITPv6AjwPnRh/sy8OSuFqa6G

let users = [
    {
        userId: '1',
        username: 'catt',
        password: '$2b$12$lYxmN8Dgv7iBelrutKPYUeS7gc5g4ITPv6AjwPnRh/sy8OSuFqa6G',
        email: 'cat@student.ubc.ca',
    },
    {
        userId: '2',
        username: 'dogg',
        password: '$2b$12$LYButVbQ.uOyBViqcdECC.LEf6D2c/KoTzZKioIoSe1Mcz351cFDS',
        email: 'dog@student.ubc.ca',
    }
]


export async function findByEmail(email) {
    console.log(email);
    return users.find((user) => user.email === email);
}

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}


export async function findById(userId) {//bob userId가 uersId라고 되있었음. 논리적으로 다 맞을 때 무조건 관련된거 오타찾기.
    //console.log(users);
    const user = users.find((user) => user.userId === userId);
    return user;
}

export async function createUser(user) {
    const created = {...user, userId: Date.now().toString()};//id가 이렇게 나오니 단순한 1,2,~7인 userId랑 당연히 다르고 그러면 post랑 user정보 합치지 못하지. 일단은 모든 post의 userId를 1과 2로하고 1,2를 userId로 가진 user 2명을 각 각 데이터베이스에 넣어놓자. 새로 가입하면 date id나오니까.
    users.push(created);
    //console.log(users);
    return created.userId;
}

