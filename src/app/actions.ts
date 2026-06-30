"use server";

export async function getDailyHoroscope(sign: string) {
  try {
    const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign.toLowerCase()}&day=TODAY`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch horoscope");
    }
    
    const json = await res.json();
    return json.data?.horoscope || null;
  } catch (error) {
    console.error(`Error fetching horoscope for ${sign}:`, error);
    return null;
  }
}
