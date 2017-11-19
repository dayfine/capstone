const router = require('express').Router();
const { User } = require('../db').models;

// /api/friends

// get all friends
router.get('/', (req, res, next) => {
	console.log('im in /friends')
	User.getFriends() //where friendId = logged in id
		.then(users => {
			res.send(users)
		})
		.catch(next)
});

// get all friends from logged in user
// router.get('/friends', (req, res, next) => {
	// if (req.session.userId) {
		// User.findOne({
		// 	where: { userId: req.session.userId },
		// 	include: {
		// 		model: User,
		// 		include: UserFriend
		// 	}
		// })
		// 	.then(friends => {
		// 		res.send(friends);
		// 	})
		// 	.catch(next)
	// }
	// else {
	// 	res.send('not logged in');
	// }
// })
// get all friends

// add new friend
router.post('/:id', (req, res, next) => {
	User.findById(req.params.id)
	.then(newFriend => {
		User.addFriends(newFriend)//where friendId = logged in id
		res.send(newFriend)
	})
	.catch(next)
});

router.get('/email/:email', (req, res, next) => {
	console.log('route found')
	User.findOne({
		where: { email: req.params.email}
	})
	.then(friend => {
		if( friend ){
			User.addFriends(friend)
			.then(()=> res.redirect('/'));			
		}
		else{
			res.send('user not found')
		}		
	})
	.catch(next)
});

module.exports = router;
