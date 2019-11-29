const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-blog-5360d.firebaseio.com"
});

exports.addComment = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { comment, postId } = request.body.data;
    const user = await admin.auth().getUser(comment.uid);
    if(user){
      await admin.firestore().collection(`posts/${postId}/comments`).add({ ...comment, displayName: user.displayName });
      response.status(200).json({ data: { status: 'success' } });
    }
    else{
      response.status(403).json({ data: { error: 'Something is wrong with authentication' } });
    }
  });
});
