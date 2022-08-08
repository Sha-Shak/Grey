export interface IPost {
  comments? : Comment[],
  creator?: string,
  likes?: string[],
  message?: string,
  selectedFile?: string,
  tag?: string[],
  title?: string,
  updatedAt?: string,
  createdAt?: string,
  __v?: number,
  _id?: string,
}

export interface Comment {
  id: string
  comment: string,
  userId: string,
  _id: string
}

export interface ILoginUser {
  email: string,
  password: string
}

export interface INewUser {
  firstName: string, 
  email: string, 
  lastName: string, 
  password: string, 
  confirmPassword: string
}