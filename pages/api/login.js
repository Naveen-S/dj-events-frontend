import { API_URL } from '@/config/index';
import axios from 'axios';
import cookie from 'cookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    console.log({ identifier, password });
    // const response = await fetch(`${API_URL}/api/auth/local`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: JSON.stringify({ identifier, password }),
    // });
    const response = await axios
      .post(`${API_URL}/api/auth/local`, {
        identifier,
        password,
      })
      .then((strapiRes) => {
        console.log(strapiRes);
        if (strapiRes.status === 200) {
          // TODO: Set cookie
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', strapiRes.data.jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 365, // one year
              sameSite: 'strict',
              path: '/',
            })
          );
          res.status(200).json({ user: strapiRes.data.user });
        } else {
          res
            .status(strapiRes.error.status)
            .json({ message: strapiRes.error.message });
        }
      });
    // const data = await response.json();
    // console.log('data ', JSON.stringify(data));
    // if (response.ok) {
    //   res.status(200).json({ user: data.user });
    // } else {
    //   res.status(data.error.status).json({ message: data.error.message });
    // }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
