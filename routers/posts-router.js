const express = require('express');

const router = express.Router();

const posts = require('../data/db');

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing post title or contents.",
		})
	} else {
        posts.insert(req.body)
            .then((post) => {
                res.status(201).json(post)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "Error adding the post.",
                })
            })
    }
})

router.post('/:id/comments', (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
			message: "Missing text for the comment.",
		})
    } else {
        posts.insertComment({
            text: req.body.text,
            post_id: req.params.id,
        })
            .then((comment) => {
                res.status(201).json(comment)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    message: "Error adding this comment."
                })
            })
    }
})

router.get('/', (req, res) => {
    posts.find(req.query)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts.",
			})
		})
})

router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts)
			} else {
				res.status(404).json({
					message: "Post not found.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the post.",
			})
		})
})

router.get('/:id/comments', (req, res) => {
    posts.findPostComments(req.params.id)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the comments for this post."
            })
        })
})

router.delete('/:id', (req, res) => {
    posts.remove(req.params.id)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error deleting post."
            })
        })
})

router.put('/:id', (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Missing new title or content.",
		})
	} else {
        posts.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The post could not be found.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the post.",
			})
		})
    }
})

module.exports = router;