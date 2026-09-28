import { NextResponse } from 'next/server';
import { submitOrderToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitOrderToGoogleSheet(body.order);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
