import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getLogger } from "@reebok/shared";
import { mintQuery } from "@reebok/backend-libs";

const logger = getLogger('api.token');
const integerSchema = z.number().int();

export async function GET(req: NextRequest, context: { params: { tokenId: any }}) {
  try {
    const tokenId = parseInt(context.params.tokenId, 10);
    const result = integerSchema.safeParse(tokenId);

    if (!result.success) {
      throw new Error(`Invalid token id ${tokenId}`);
    }

    logger.info('GET', 'Token ID', { tokenId });

    const remixData = await mintQuery.getMetadata(tokenId);
    if (remixData) {

      const attributes = [
        { trait_type: 'brand', value: 'Reebok' },
        { trait_type: 'model', value: remixData?.shoe_model },
        { trait_type: 'colors', value: remixData?.custom_colors },
      ];

      return NextResponse.json(
        {
          tokenId: tokenId,
          name: null,
          description: null,
          image: remixData?.image_combined_url,
          block_hash: remixData?.block_hash,
          created: remixData?.created_at,
          trait_count: attributes.length,
          attributes,
      });
    } else {
      return NextResponse.json(
        { error: `Token ID ${tokenId} not found` },
        { status: 404 }
      );
    }
  } catch (error) {
    logger.error('GET', 'Token ID', error);
    return NextResponse.json(
      { error: 'There was an error while processing your request. Please try again later.'},
      { status: 500 }
    );
  }
}
