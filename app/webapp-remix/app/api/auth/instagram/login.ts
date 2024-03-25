import { NextApiResponse, NextApiRequest } from 'next';
import config from '../../../../utils/config';

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.redirect(
    307,
    `https://api.instagram.com/oauth/authorize?client_id=${config.facebookApp.appApi}&redirect_uri=${config.socialAuth.instagramCallbackUrl}&response_type=code&scope=user_profile`
  );
  // response
  // https://84cc-103-66-125-115.ngrok.io/api/auth/callback?code=AQAaX8sNE1yk6iHwiRfqXN3xhRCGXvYprHgKHvmbaVj0rfpa4ZbBzLA0Frb5mI3bvekbOeW1oyN7dPvHeJZ3sfU2AaqFkQLCYOYXa6Nzi0u3DXywlk_Y3Nt2mzW_zyNUSi8Y73zqp7DDmyQ9_Cto2hZdgL5y-IICPwbiO5Lfj87gDrwLercpn-5mBn3quyFihjmUJ_sbEDbvKwmTRVbTPIqQmvWsIKX9giLNH_DWGeY_UQ#_
};

export default handler;
