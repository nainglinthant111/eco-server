const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const {User,Products,Orders} = require('./db/mongo')
const port = 8000;

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

// // Middleware to check authentication
// async function authenticate(req, res, next) {
//     const { userEmail, password } = req.body;
//     try {
//         const user = await User.findOne({ userEmail: userEmail});
//         if (!user && user === null) {
//             res.status(404).send({ message: 'User Not Found' });
//         }else if (user) {
//             const hashedPassword = user.password
//             try{
//                 const match = await bcrypt.compare(password, hashedPassword);
//                 if (match){
//                     req.session.user = user;
//                     req.session.userId = user._id
//                     next();
//                 }else {
//                     res.status(401).send({ message: 'Authentication Failed' })
//                 }
//             }catch (e) {
//                 console.log(e)
//             }
//         }
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// }

// //Check UserExist middleware
// async function checkDuplicateUser(req,res,next){
//     const  userData = req.body;
//     try {
//         const userEmail = userData.email
//         const alreadyRegisteredUser = await User.findOne({ userEmail: userEmail });
//         if(alreadyRegisteredUser){
//             res.json({message : "User Already Registered",statusCode : '409'})
//         }else{
//             next();
//         }
//     }catch (e) {
//         res.status(500).send("Internal Server Error");
//     }
// }

// async function checkUserExist(req,res,next){
//     const  { userEmail } = req.body;
//     try {
//         const existUser = await User.findOne({ userEmail: userEmail });
//         if(existUser){
//             req.existUser = existUser;
//             next();
//         }else{
//             res.status(404).json({ error: 'User Not Found' });
//         }
//     }catch (e) {
//         res.status(500).send("Internal Server Error");
//     }
// }

// app.post('/checkuser', checkUserExist ,(req,res) => {
//     const existUser = req.existUser
//     res.status(200).json({ user: 'found', userId : existUser._id });
// })

// app.post('/login', authenticate, (req, res) => {
//     res.status(200).send({ message: 'Authentication Successful', "user" : req.session.user })
// });

// app.post('/verify_email', async (req, res) => {
//     const user = req.body;
//     const userName = user.userName
//     const userEmail = user.userEmail
//     const verificationCode = generateSixDigits();

//     try {
//         const response = await sendGrid.sendEmail({ userName,userEmail,verificationCode });
//         console.log("Verification Code =======>",verificationCode);
//         req.session.verificationCode = verificationCode;
//         res.json({ message: 'Email sent successfully!', response });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// });

// app.post('/portfolio_mailservice', async (req, res) => {
//     const {email,subject,content} = req.body;
//     try {
//         const response = await portfolio_mailservice.sendEmail({ email,subject,content });
//         res.status(200).json({message : "Email Succefully Sent", statusCode : 200})
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// });

// app.post('/checkDuplicateUser',checkDuplicateUser, async (req, res) => {
//     res.status(200).json({ message : "No Duplicate User",statusCode : '200'});
// });

// app.post('/checkVerificationCode', async (req, res) => {
//     const verificationCode = req.body;
//     let codeString = verificationCode.code;
//     let codeNumber = parseInt(codeString);
//     const codeFromSession = req.session.verificationCode;
//     console.log('CodeNumber=====>',codeNumber);
//     console.log('COde From Session=====>',codeFromSession);
//     if (codeNumber === codeFromSession) {
//         console.log('****************Succeess*********************');
//         res.status(200).json({ message: "Verification code match", statusCode: 200 });
//     } else {
//         console.log('**************400 Return*******************');
//         res.status(400).json({ message: "Verification code does not match", statusCode: 400 });
//     }
// });

// app.get('/createUsers', async (req, res) => {
//     console.log('Work');
//     console.log("***********************Session in create User*****************",req.session);
//     try {
//         const preUser = req.session.preUser
//         console.log("PreUser====>",preUser);
//         const password = preUser.password
//         preUser.password = await passwordHash(password)
//         const newUser = new User(preUser);
//         await newUser.save();
//         res.status(201).json({ message: "Account Create Successful", statusCode: 201});
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/posts', async (req, res) => {
//     try {
//         const postData = req.body;
//         const newPost = new Post(postData);
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create post' });
//     }
// });

// app.get("/posts", async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.send({message:"get post success",data:posts})
//     } catch (error) {
//         res.status(500).json({ error: "Error retrieving posts" });
//     }
// });

// app.get("/users", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.send({message:"get user success",data : users})
//     } catch (error) {
//         res.status(500).json({ error: "Error retrieving posts" });
//     }
// });

// app.get("/posts/:postId", async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const post = await Post.findById(postId);
//         if (post) {
//             res.status(200).json({message : "Post Found",post})
//         }
//     } catch (error) {
//         console.error("Error retrieving post:", error);
//         res.status(500).json({ error: "Error retrieving post" });
//     }
// });

// app.get("/modifieduser/:userId", async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.send({message:"get modified user success",user})
//     } catch (error) {
//         console.error("Error retrieving user:", error);
//         res.status(500).json({ error: "Error retrieving user" });
//     }
// });


// app.put("/posts/:postId", async (req, res) => {
//     const postId = req.params.postId;
//     const updateData = req.body;
//     try {
//         const updatedPost = await Post.findByIdAndUpdate({ _id: postId }, updateData, { new: true });
//         if (!updatedPost) {
//             return res.status(404).json({ error: "Post not found" });
//         }
//         res.send({message:"get specific post success",updatedPost})
//     } catch (error) {
//         console.error("Error updating post:", error);
//         res.status(500).json({ error: "Error updating post" });
//     }
// });

// app.put("/users/:userId", async (req, res) => {
//     const userId = req.params.userId;
//     const updateData = req.body;
//     if(updateData.password){
//         updateData.password = await passwordHash(updateData.password)
//     }
//     try {
//         const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true });
//         if (!updatedUser) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.status(200).json({ message: "User updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).json({ error: "Error updating user" });
//     }
// });


app.get("/test", async (req, res) => {
    res.send('Hello')
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});