import React,{useState, useEffect} from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebase-conig';


const Form = ({isAuth}) => {
     //USESTATE is use to store data
  const [postLists, setPostList] = useState([]);
  //creating a collection in our database
 const postCollectionRef = collection(db, "ALLpost")
  //
  useEffect(()=>{
   try {
     const getPost = async ()=>{
       const data = await getDocs(postCollectionRef);
       setPostList(data.docs.map((doc) => ({...doc.data(), id:doc.id })));
       //console.log(data.docs.map((doc) => ({...doc.data(), id:doc.id })));
     };
     getPost();
   } catch (error) {
     console.log(error);
   }
  }, []);
  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const postDoc = doc(db, "ALLpost", id); // Correct collection name
      await deleteDoc(postDoc);
      setPostList(postLists.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

 return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1 className="font-bold text-[5vh] text-[#ecae29]">{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth &&  (
                  <button onClick={() => deletePost(post.id)}>🗑️</button>
                )}
              </div>
            </div>
            <h3>
              <div className="postTextContainer">Name: {post.name}</div>
              <div className="postTextContainer">Age: {post.age}</div>
              <div className="postTextContainer">Location: {post.location}</div>
              <div className="postTextContainer">Plan: {post.plan}</div>

              
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Form
