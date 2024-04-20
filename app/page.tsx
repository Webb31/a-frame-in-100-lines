import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Verify',
      postUrl: `${NEXT_PUBLIC_URL}/api/post`,
    },
    {
      action: 'link',
      label: 'Open Link',
      target: `https://youtu.be/LRVJRXMAp2g?si=yAzlPNlZzghNlQlw`,
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    },
  ],
  image: {
    src: `https://zd56xv.csb.app/Base_Warpcast_files/CryptoMakesMoneyFasterWhyCryptowithBrianArmstrong.gif`,
  },
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
