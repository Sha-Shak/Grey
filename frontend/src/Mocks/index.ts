import {
  rest,
} from 'msw';

const url = 'http://localhost:8080'

export const testUser = {
  email: 'user@gmail.com',
  result: {
    createdAt: 'today',
    email: 'user@gmail.com',
    name: 'Pedro',
    password: 'password',
    updatedAt: 'today',
    __v: 1234,
    _id: '015000dgerf'
  },
  token: 'jwtToken',
};

export const testUser2 = { 
  result: {
    createdAt: 'today',
    email: 'user2@gmail.com',
    name: 'Jane',
    password: 'password',
    updatedAt: 'today',
    __v: 0,
    _id: '0dsf15000dgerf'
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5c'
}

export const testPost = {
  comments: [],
  creator: 'Mariana',
  likes: ['5151561'],
  message: 'Coding is fun when you know what is going on with your code :)',
  selectedFile: 'code',
  tag: ['#try'],
  title: 'Programming Truth',
  updatedAt: 'today',
  createdAt: 'yesterday',
  __v: 0,
  _id: '76848646',
}

export const routes = [
  rest.post<any>(
    url + '/user/signin',
    (req, res, ctx) => {
      const { email, password } = req.body;
      if (email !== testUser.email) {
        return res(
          ctx.status(404),
          ctx.json({
            res: `User doesn't exist`,
            error: true,
          })
        );
      }
      if (password !== testUser.result.password) {
        return res(
          ctx.status(400),
          ctx.json({
            res: 'JSON Wrong Password',
            error: true,
          })
        );
      }
      if (email === testUser.email && password === testUser.result.password) {
        return res(
          ctx.status(200),
          ctx.json({email, result: testUser.result , token: testUser.token})
        )
      } 

      return res(
        ctx.status(500),
        ctx.json({message: 'something went wrong'})
      );
      
    }
  ),
  
  rest.post<any>(
    url + '/user/signup',
    (req, res, ctx) => {
      const { firstName, lastName, email, password, confirmPassword } = req.body;
      if (email === testUser.email) {
        return res(
          ctx.status(404),
          ctx.json({
            res: `User already exists`,
            error: true,
          })
        );
      }
      if (password !== confirmPassword) {
        return res(
          ctx.status(400),
          ctx.json({
            res: `Passwords don't match!`,
            error: true,
          })
        );
      }

      return res(
        ctx.status(201),
        ctx.json({result: testUser2.result , token: testUser2.token})
      );
      
    }
  )

];
