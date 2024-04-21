import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { getEASAttestations } from '@coinbase/onchainkit/identity';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  const address = '0x596b8eeDe78d360c9484f715919038F3d27fc8Df';
  const attestationsOptions = {
    schemas: ['0x67f4ef704a08dfb74df8d9191b059ac9515fb5f8ffe83529a342958397fa732c'],
  };

  const attestations = await getEASAttestations(address, base, attestationsOptions);
  console.log(attestations);

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }
  
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Verify',
        },
        {
          action: 'link',
          label: 'Open Link',
          target: `https://youtu.be/LRVJRXMAp2g?si=yAzlPNlZzghNlQlw`,
        },
      ],
      image: {
        src: `https://zd56xv.csb.app/Base_Warpcast_files/CryptoMakesMoneyFasterWhyCryptowithBrianArmstrong.gif`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
