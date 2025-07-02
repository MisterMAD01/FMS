import React from "react";
import PostItem from "./PostItem";
function Posts(props) {
  return (
    <div>
      <PostItem
        title="Hello World"
        content="This is content of Hello World."
      ></PostItem>
      <PostItem
        title="Goodbye World"
        content="This is content of Goodbye."
      ></PostItem>
    </div>
  );
}
export default Posts;
