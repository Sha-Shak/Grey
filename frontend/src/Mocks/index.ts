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
];