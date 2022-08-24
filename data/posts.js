let posts = [
    {
        id: '1',
        username: 'tester1',
        category: 'history',
        title: 'test1',
        likes: 56,
        createdAt: '6:00',
        text: 'this is test1.',
        views: '1',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        id: '2',
        username: 'tester2',
        category: 'notification',
        title: 'test2',
        likes: 526,
        createdAt: '7:00',
        text: 'this is test2.',
        views: '1',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        id: '3',
        username: 'tester3',
        category: 'bookmark',
        title: 'test3',
        likes: 56324,
        createdAt: '8:00',
        text: 'this is test3.',
        views: '1',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        id: '4',
        username: 'tester4',
        category: 'history',
        title: 'test4',
        likes: 2362323,
        createdAt: '3:00',
        text: 'this is test4.',
        views: '1',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        id: '5',
        username: 'tester5',
        category: 'history',
        title: 'test5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        likes: 2,
        createdAt: '2:00',
        text: 'this is test5. longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        views: '1',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        
        id: '6',
        username: 'tWhale',
        category: 'notification',
        title: 'whale is testing',
        likes: '25',
        createdAt: Date.now().toString(),
        text: "Whale Whale Whale Whale Whale",
        views: '34',
        postingPeriod: true,
        comment: true,
        profanity: true,
        sex: false,
    },
    {
        id: '7',
        username: 'tShark',
        category: 'confession',
        title: 'Shark is testing',
        likes: '50',
        createdAt: Date.now().toString(),
        text: "Shark Shark Shark Shark Shark",
        views: '90',
        postingPeriod: false,
        comment: false,
        profanity: false,
        sex: true,
    },
];

//같은 단어 한꺼번에 클릭 crt + shift + l
export async function getAll() {
    return posts;
}

export async function getAllByCategory(category) {
    return posts.filter((p) => p.category === category)
}

export async function getById(id) {
    return posts.find((p) => p.id === id);
}

export async function create(username, anonymous, title, text, category, period, postingPeriod, comment, profanity, sex) {
    const post = {
        id: Date.now().toString(),
        anonymous,
        username,
        title,
        text,
        category,
        period,
        postingPeriod, 
        comment, 
        profanity, 
        sex,
    }
    posts = [post, ...posts];
    return posts
}



export async function update(id, title, text, category, postingPeriod, comment, profanity, sex) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.title = title;
        post.text = text;
        post.postingPeriod = postingPeriod;
        post.comment = comment;
        post.profanity = profanity;
        post.sex = sex;
        post.category = category;
    }
    return post
}

export async function remove(id) {
    posts = posts.filter(p => p.id !== id);
}