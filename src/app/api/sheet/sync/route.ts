import { NextResponse } from 'next/server';
import { fetchGoogleSheetData } from '@/lib/googleSheets';

export async function GET() {
  try {
    const data = await fetchGoogleSheetData();
    return NextResponse.json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
