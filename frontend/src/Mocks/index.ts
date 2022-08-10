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


// export default async function mockFetch(url) {
//   switch (url) {
//       case "http://localhost:8080/posts": {
//           return {
//               ok: true,
//               status: 200,
//             //  json: async () => breedsListResponse,
//           };
//       }
//       case "https://dog.ceo/api/breed/cattledog/images": {
//           return {
//               ok: true,
//               status: 200,
//             //  json: async () => dogImagesResponse,
//           };
//       }
//       default: {
//           throw new Error(`Unhandled request: ${url}`);
//       }
//   }
// }