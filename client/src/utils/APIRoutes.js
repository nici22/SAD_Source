export const host = 'http://localhost:5000';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const logoutRoute = `${host}/api/auth/logout`;
export const sendResetPasswordRoute = `${host}/api/auth/password_reset`;

export const searchUserRoute = `${host}/api/users/search`;
export const GetUserRoute = `${host}/api/users/user`;
export const followRoute = `${host}/api/users/follow`;
export const isFollowingRoute = `${host}/api/users/isFollowing`;
export const setUserRoute = `${host}/api/users/setUser`;
export const getEditChecker = `${host}/api/users/getEditChecker`;
export const getUserByIdRoute = `${host}/api/users/getUserById`;

export const createPostRoute = `${host}/api/posts/createPost`;
export const getPostsRoute = `${host}/api/posts/getPosts`;
export const fetchPostRoute = `${host}/api/posts/fetchPost`;
export const findFromPostRoute = `${host}/api/posts/findFromPost`;
export const likePostRoute = `${host}/api/posts/likePost`;
export const dislikePostRoute = `${host}/api/posts/dislikePost`;
export const getHomePostsRoute = `${host}/api/posts/getHomePosts`;

export const createCommentRoute = `${host}/api/comments/createComment`;
export const getUserFromCommentRoute = `${host}/api/comments/getUserFromComment`;
