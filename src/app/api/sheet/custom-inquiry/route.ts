import { NextResponse } from 'next/server';
import { submitCustomInquiryToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitCustomInquiryToGoogleSheet(body.inquiry);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
