import post from "../models/post.model.js";

export async function createpost(data) {
  const { mentions, url, caption, user } = data;

  return await post.create({
    image: url,
    caption,
    user,
    mentions,
  });
}
export async function getPosts(skip = 0, limit = 0) {
  const posts = await postModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return posts;
}
