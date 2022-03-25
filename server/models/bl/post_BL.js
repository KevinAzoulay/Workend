const Post = require('../postModel')
const User = require('../userModel')

//Creates a Post Obj based of the Post Schema and puts of the PostObj info 
//from the req obj into the new Post and at the end saves the new Post.

//Add a Post function, recives a postObj, creates a JS object with new Post() based off the postSchema,
//the data is inserted to the newPost Obj and is saved, after the saving is finished a callback function is fired
// and adds the newPosts ID that was generated by the mongodb server to the user who posted its posts array
const addAPost = (postObj) => {
  return new Promise((resolve, reject) => {
    let newPost = new Post()
    // newUser.username = postObj.username
    // newUser.password = postObj.password
    newPost.userid = postObj.userid
    newPost.text = postObj.text
    newPost.date = new Date().getTime()

    newPost.save(async (err) => {
      if (err) {
        reject(err)
      }

      let theUser = await User.findById(newPost.userid)
      theUser.posts.push(newPost._id)
      User.findByIdAndUpdate(`${newPost.userid}`, theUser).then(() => {
        resolve(`Added post for USERID: ${newPost.userid}, the post ID is ${newPost._id}`)
      })


    })
  })
}

//Sends a query to the DB and 
//returns all docs from the Post collection
const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    Post.find({}).then(data => resolve(data)).catch(err => {
      reject(err)
    })
  })
}


//Sends a query to the DB and returns one Post with
// that id  from the Post collection
const getPostByID = (id) => {
  return new Promise((resolve, reject) => {
    Post.findById(id)
      .then(data => resolve(data))
      .catch(err => {
        reject(err)
      })
  })
}


const deletePostByID = (id) => {
  return new Promise( async (resolve, reject)  => {
    //Save oldpost object before finding and deleteing.
    let oldPost = await Post.findById(id)
    //Find by ID and delete 
    Post.findByIdAndDelete(id)
      .then(async (data) => {
        //Query for the User by using the userID from the oldpost object
        let theUser = await User.findById(oldPost.userid)
        //Filter through the array, removing the oldPost ID
        theUser.posts = theUser.posts.filter(postID => postID != id )
        //Update UserObj 
        User.findByIdAndUpdate(oldPost.userid, theUser)
          .then(() => resolve("Deleted"))
            .catch(err => reject(err))
      })
  })
}
//Sends a query to the DB and updates
// that id  from the Post collection
const updatePostbyID = (id, postObj) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndUpdate(id, postObj, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve('updated')
      }
    })


  })
}

//Querys DB with .find and searches for docs with userID equal to the one passed over
//as params
const getAllUserPosts = (id) => 
{
return new Promise((resolve, reject) => {
  Post.find({userid : `${id}`}).then(data => 
    { resolve(data); console.log(data)}).catch( err => { reject(err)} )
})
}

module.exports = {
  addAPost,
  getAllPosts,
  getPostByID,
  updatePostbyID,
  deletePostByID,
  getAllUserPosts
}