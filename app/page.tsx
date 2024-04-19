import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Open Link',
    },
    {
      action: 'tx',
      label: 'Verify',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
      postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
    },
  ],
  image: {
    src: `https://zd56xv.csb.app/Base_Warpcast_files/CryptoMakesMoneyFasterWhyCryptowithBrianArmstrong.gif`,
  },
  input: {
    text: 'Paste link',
  },
  postUrl: `https://a-frame-in-100-lines-teal.vercel.app/api/frame`,
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
