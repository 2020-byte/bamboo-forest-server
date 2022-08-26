import * as postRepository from '../data/posts.js';

export async function getPosts(req, res) {
    const category = req.query.c;
    const data = await (category
        ? postRepository.getAllByCategory(category)
        : postRepository.getAll());
    res.status(200).json(data);
}

export async function getPost (req, res) {
    const id = req.params.id;
    const post = await postRepository.getById(id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
}

export async function createPost(req, res) {
    //userId를 클라이언트의 user state 배열에서 받아오는 게 아니라 로컬스토리지에 저장해났잖아. 유저정보를 그거 가지고 유저가 맞는지 확인해주는게 미들웨어 isAuth고 그러면 isAuth를 이용해서 userId를 가져와야지.
    //delete, edit할 때 user state도 이용하는 건 UI를 변경시켜야 하기 때문이고.
    const {anonymous, title, text, category, postingPeriod, comment, profanity, sex} = req.body;
    console.log(req.userId);
    const userId = req.userId;
    const post = await postRepository.create({ anonymous, category, title, text, postingPeriod, comment, profanity, sex, userId});
    res.status(201).json(post);
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const {title, anonymous, text, category, postingPeriod, comment, profanity, sex} = req.body;
    const post = await postRepository.getById(id);
    if (!post) {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
    if (post.userId !== req.userId) {   //req.userId는 라우터에서 updatePost로 들어오기전 isAuth에서 얻어짐.
        return res.sendStatus(403);
    }
    const updated = await postRepository.update(id, anonymous, title, text, category, postingPeriod, comment, profanity, sex);
    res.status(200).json(updated);
}

export async function deletePost(req, res, next) {
    const id = req.params.id;
    const post = await postRepository.getById(id);
    if (!post) {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
    
    if (post.userId !== req.userId) {   //req.userId는 라우터에서 updatePost로 들어오기전 isAuth에서 얻어짐.
        return res.sendStatus(403);
    }
    await postRepository.remove(id);
    res.sendStatus(204);
}