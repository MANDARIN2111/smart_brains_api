const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '0b70d30012c54c76bb326fe10981ee76'
});

const handleApiCall = (req,res)=>{
	app.models
   	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
   	.then(data =>{
   		res.json(data)
   	})
   	.catch(err => res.status(400).json('unable to fetch data from API'))
}

const handleImage = (req,res,db)=>{
	const { id } = req.body;
	db('users').where('id', '=' , id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries =>{
			res.json(entries);
		})
	.catch(err =>{
		res.status(400).json('error occured')
	})
}
module.exports = {
	handleImage:handleImage,
	handleApiCall:handleApiCall
}