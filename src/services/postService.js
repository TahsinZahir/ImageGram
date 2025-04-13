import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById, updatePostById } from "../repositories/postRepository.js";

export const createPostService = 

// 1.take the image of the post and upload on aws 2.Get url of the image from aws response 3.Create a post with the captain and the image url in the db using repository 4. Return the post object
async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    const user = createPostObejct.user; 

    const post = await createPost(caption, image, user);

    return post;
}

export const getAllPostsService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments
    }

}

export const deletePostService = async (id, user) => {
    // call the repository function
    const post = await findPostById(id);
    if(post.user != user) {
        throw {
            status: 401,
            message: "Unauthorized"
        }
    }
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    // call the repository function
    const response = await updatePostById(id, updateObject);
    return response;
}