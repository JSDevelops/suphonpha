import '@testing-library/jest-dom';

// Reset Google Sheet URL before each test suite so unit tests don't make accidental live network calls
delete process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;
delete process.env.GOOGLE_SHEET_API_URL;
