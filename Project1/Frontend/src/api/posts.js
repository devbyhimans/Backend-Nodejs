const BASE = 'http://localhost:3000';

/**
 * Upload a new post.
 * @param {File} imageFile
 * @param {string} caption
 */
export async function createPost(imageFile, caption) {
  const form = new FormData();
  form.append('image', imageFile);
  form.append('caption', caption);

  const res = await fetch(`${BASE}/create-post`, {
    method: 'POST',
    body: form,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data; // { message, imageUrl, post }
}

/**
 * Fetch all posts.
 */
export async function getPosts() {
  const res = await fetch(`${BASE}/posts`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch posts');
  return data.posts; // [{ _id, image, caption }]
}
