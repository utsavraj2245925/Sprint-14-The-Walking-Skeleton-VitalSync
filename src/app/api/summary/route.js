import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { patientInfo } = await req.json();

    return NextResponse.json({
      summary: `
Patient Summary

${patientInfo}

Assessment:
The patient is currently under observation and receiving appropriate treatment.

Recommendations:
• Continue prescribed medications
• Monitor symptoms regularly
• Maintain hydration
• Follow doctor's advice
• Schedule follow-up if symptoms worsen
      `,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate summary",
      },
      {
        status: 500,
      }
    );
  }
}