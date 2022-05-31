import { API_URL } from '@/config/index';
import axios from 'axios';
import cookie from 'cookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
    }

    const { token } = cookie.parse(req.headers.cookie);

    const response = await axios
      .get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((strapiRes) => {
        console.log('user me response', strapiRes);
        if (strapiRes.status === 200) {
          res.status(200).json(strapiRes?.data);
        } else {
          res.status(403).json({ message: 'User forbidden' });
        }
      });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
