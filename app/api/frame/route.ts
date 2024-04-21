import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  export const EASContractAddress = "0x4200000000000000000000000000000000000021";
  const eas = new EAS(EASContractAddress);
  const provider = ethers.getDefaultProvider(
    "sepolia"
  );
  eas.connect(provider);

  const uid = "0xea40915a79a6c699658e225db836ce2cbe09f55aa22e0e4b0e64377bdd78b6ae";

  const attestation = await eas.getAttestation(uid);

  console.log(attestation);

  if (isValid) {
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
