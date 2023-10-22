import { NumberSchema } from "@/lib/zodTypes";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
  const { number } = await req.json();
  if (!number) return NextResponse.json({ error: "Number is required" }, { status: 400 })


  try {
    const safeNumber = NumberSchema.parse({ number });
    if (safeNumber) {
      const response = await fetch(`https://livetracker.online/live-tracker-result.php`, {
        method: 'POST',
        body: `num=${safeNumber.number}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.text();
      return NextResponse.json({ data });
    }



  } catch (error) {
    return NextResponse.json({ error: "Number is not valid" }, { status: 400 })
  }
  return NextResponse.json({ error: "Something Bad Happend :(" }, { status: 400 })
};