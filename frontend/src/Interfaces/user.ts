export interface IResult {
  createdAt: string,
  email: string,
  name: string,
  password: string,
  updatedAt: string,
  __v: number,
  _id: string
}

export interface IUser {
  email: string,
  result: IResult,
  token: string
}
