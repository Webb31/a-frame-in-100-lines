import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  const easContractAddress = "0x4200000000000000000000000000000000000021";
  const schemaUID = "0x67f4ef704a08dfb74df8d9191b059ac9515fb5f8ffe83529a342958397fa732c";
  const eas = new EAS(easContractAddress);
  // Signer must be an ethers-like signer.
  await eas.connect(signer);
  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("string URL");
  const encodedData = schemaEncoder.encodeData([
    { name: "URL", value: "https://youtu.be/LRVJRXMAp2g?si=pCMcY-dI26JN_jHN", type: "string" }
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000",
      expirationTime: 0,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  const newAttestationUID = await tx.wait();
  console.log("New attestation UID:", newAttestationUID);

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
