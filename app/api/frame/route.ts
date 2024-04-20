import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { Avatar } from '@coinbase/onchainkit/identity';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
  const queryClient = new QueryClient();

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  function App() {
    return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
        <Avatar address="0x596b8eeDe78d360c9484f715919038F3d27fc8Df" />
      </QueryClientProvider>
    );
  }

  console.log(App);
  
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
