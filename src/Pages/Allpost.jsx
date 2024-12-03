import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/Index";
import appwriteServices from "../appwrite/services";

function Allpost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteServices.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents)
    }
  });
  return (
  <div className="w-full py-8">
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
        <div className="p-2 w-1/4" key={post.$id}>
          <PostCard post={{...post}}/>
        </div>
        ))}

      </div>
    </Container>
  </div>

  );
}

export default Allpost;
