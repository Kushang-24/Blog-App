const express = require('express');

module.exports = (upload) => {
    const router = express.Router();
    const { home, AddData, update, deleteData, editPage ,login, loginPage,signup, signupPage, logout} = require('../controllers/Blogscontroller');
    const {UserAuth,isAuth} = require('../middleware/BlogsAuth');
    const {BlogsDB,DataAuth} = require('../models/UserData');

    router.get('/add', (req, res) => {
        res.render('addblog');
    });
    router.get('/',isAuth, home);
    router.post('/AddData', upload.single('Image'), UserAuth, AddData);

    router.get('/edit/:id', async (req, res) => {
        try {
            const blog = await BlogsDB.findById(req.params.id);
            if (!blog) {
                return res.status(404).send('Blog not found');
            }
            res.render('editblog', { blog });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

    router.post('/update/:id', upload.single('Image'), update);
    router.post('/delete/:id', deleteData);

    router.post('/signup', signup);
    router.get('/signup', signupPage);
    
    router.post('/login', login);
    router.get('/login', loginPage);
    
    router.get('/logout', logout);
    return router;
};
