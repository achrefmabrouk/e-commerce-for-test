const cloudinary = require('cloudinary').v2



cloudinary.config({ 
    cloud_name: 'dbbru6vec', 
    api_key: '475261348315112', 
    api_secret: '***************************' ,
    secure:true
  });




  module.exports = cloudinary