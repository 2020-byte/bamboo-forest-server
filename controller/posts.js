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
    const {username, anonymous, title, text, category, period, postingPeriod, comment, profanity, sex} = req.body;
    const post = await postRepository.create(username, anonymous, title, text, category, period, postingPeriod, comment, profanity, sex);
    res.status(201).json(post);
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const {title, text, category, postingPeriod, comment, profanity, sex} = req.body;
    const post = await postRepository.update(id, title, text, category, postingPeriod, comment, profanity, sex);
    console.log(post);
    if (post) {
        
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
}

export async function deletePost(req, res, next) {
    const id = req.params.id;
    await postRepository.remove(id);
    res.sendStatus(204);
}