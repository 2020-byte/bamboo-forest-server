import express from 'express';

let posts = [
    {
        id: '1',
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
        id: '2',
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

const router = express.Router();

//GET /posts
//GET /posts?c=:category

router.get('/posts', (req, res, next) => {
    const category = req.query.category;
    console.log(category);
    const data = category
        ? posts.filter((p) => p.category === category)
        : posts;
    res.status(200).json(data);
});

//GET /posts/:id
router.get('/posts/:id',(req, res, next) => {
    const id = req.params.id;
    const post = posts.find((p) => p.id === id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
});

//POST /write
router.post('/write',(req, res, next) => {
    const {username, title, text, category, postingPeriod, comment, profanity, sex} = req.body;
    const post = {
        id: Date.now().toString(),
        username,
        title,
        text,
        category,
        postingPeriod, 
        comment, 
        profanity, 
        sex,
    }
    posts = [post, ...posts];
    res.status(201).json(post);
});

//PUT /posts/:id
router.put('/posts/:id', (req, res, next) => {
    const id = req.params.id;
    const {title, text, postingPeriod, comment, profanity, sex} = req.body;
    const post = posts.find(p => p.id === id);
    if (post) {
        post.title = title;
        post.text = text;
        post.postingPeriod = postingPeriod;
        post.comment = comment;
        post.profanity = profanity;
        post.sex = sex;
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post id(${id}) not found`});
    }
});


//DELETE /posts/:id
router.delete('/posts/:id', (req, res, next) => {
    const id = req.params.id;
    posts = posts.filter(p => p.id !== id);
    res.sendStatus(204);
})

export default router;