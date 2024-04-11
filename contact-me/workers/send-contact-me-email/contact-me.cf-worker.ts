import { CloudflareOptions } from '@teambit/cloud-providers.aspects.cloudflare-worker';

export const Subscribe: CloudflareOptions = {
  // the name for your worker app (used by bit)
  name: 'subscribe',

  // an entry file for your worker's dev/prod builds
  entry: require.resolve('./contact-me.app-root'),

  // your cloudflare details for deployment
  deployOptions: {
    // the auth token for cloudflare (https://developers.cloudflare.com/api/tokens/create)
    auth: { token: process.env.CLOUDFLARE_TOKEN_PERSONAL },
    // your cloudflare account id
    accountId: '01a55b253117dd12442d7c6f17a2945d',
    // the cloudflare hosting zone id
    zoneId: 'd14f0b15835208c5cada13e982cd9523',
    // the url for the deployed worker
    routes: ['cohen.codes/contact-me'],
  },
};

export default Subscribe;
