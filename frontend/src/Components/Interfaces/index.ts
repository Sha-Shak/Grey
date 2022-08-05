export interface Post {
  comments : Comment[],
  creator: string,
  likes: string[],
  message: string,
  selectedFile: string,
  tag: [],
  title: string,
  updatedAt: string,
  __v: number,
  _id: string,
}

export interface Comment {
  id: string
  comment: string,
  userId: string,
  _id: string
}

export interface RootState {
  posts: []
}