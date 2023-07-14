import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    userId: {
      type: String,
    },
    creator: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    picturePath: String,
    comment: {
      type: Array,
      default: [],
    },
  },
  {
    timestamp: true,
  }
);

const Post = model("Post", PostSchema);
export default Post;
