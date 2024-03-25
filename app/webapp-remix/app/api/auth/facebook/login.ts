import { NextApiResponse, NextApiRequest } from 'next';
import config from '../../../../utils/config';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    307,
    `https://www.facebook.com/v17.0/dialog/oauth?client_id=${config.facebookApp.appId}&redirect_uri=${config.socialAuth.facebookCallbackUrl}&response_typecode%20token=&state=tre_fb_state`
  );
};

export default handler;
