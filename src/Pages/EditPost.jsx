import React, { useEffect } from "react";
import { Container, PostForm } from "../components/Index";
import { useParams, useNavigate } from "react-router-dom";
import appwriteServices from "../appwrite/services";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteServices.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } 
      });
    }
    else {
        navigate("/");
      }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
