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
    const {userId, anonymous, title, text, category, postingPeriod, comment, profanity, sex} = req.body;
    const post = await postRepository.create(userId, anonymous, title, text, category, postingPeriod, comment, profanity, sex);
    res.status(201).json(post);
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const {title, anonymous, text, category, postingPeriod, comment, profanity, sex} = req.body;
    const post = await postRepository.getById(id);
    if (!post) {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
    console.log(post.userId);
    console.log(req.userId);
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