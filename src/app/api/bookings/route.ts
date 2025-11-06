import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/utils/email";

// Service type display names for emails
const SERVICE_NAMES: Record<string, string> = {
  "wardrobe-detox": "Wardrobe Detox",
  "occasion-styling": "Occasion Styling",
  "personal-shopping": "Personal Shopping",
  "style-drop": "Style Drop",
  "package-offers": "Package and Offers",
  "visual-merchandising": "Visual Merchandising",
  "concept-development": "Concept Development",
  "brand-shoots": "Brand Shoots",
  "space-edit": "Space Edit",
  "brand-spaces": "Brand Spaces",
  "makeover-projects": "Makeover Projects",
};

export async function POST(req: NextRequest) {
  try {
    // Check if user is logged in
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to book a session" },
        { status: 401 }
      );
    }

    const { sessionType } = await req.json();

    if (!sessionType) {
      return NextResponse.json(
        { error: "Session type is required" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        sessionType,
        status: "pending",
      },
      include: {
        user: true,
      },
    });

    // Get service display name
    const serviceName = SERVICE_NAMES[sessionType] || sessionType;

    // Send email to admin (SENDER_EMAIL)
    const adminEmailSubject = `New Booking Request - ${serviceName}`;
    const adminEmailText = `
Hello,

You have received a new booking request!

Booking Details:
- Service: ${serviceName}
- Customer Name: ${user.username}
- Customer Email: ${user.email}
- Booking ID: ${booking.id}
- Date: ${new Date(booking.createdAt).toLocaleString()}
- Status: ${booking.status}

Please contact the customer to confirm the booking details.

Best regards,
Wear It Wrong Booking System
    `.trim();

    await sendEmail(
      process.env.SENDER_EMAIL!,
      adminEmailSubject,
      adminEmailText
    );

    // Send confirmation email to customer
    const customerEmailSubject = `Booking Confirmation - ${serviceName}`;
    const customerEmailText = `
Hello ${user.username},

Thank you for booking with Wear It Wrong!

Your Booking Details:
- Service: ${serviceName}
- Booking ID: ${booking.id}
- Date: ${new Date(booking.createdAt).toLocaleString()}
- Status: Pending Confirmation

We have received your booking request and will get back to you shortly to confirm the details and schedule your session.

If you have any questions, please don't hesitate to reach out to us at ${process.env.SENDER_EMAIL}.

Thank you for choosing Wear It Wrong!

Best regards,
Wear It Wrong Team
    `.trim();

    await sendEmail(
      user.email,
      customerEmailSubject,
      customerEmailText
    );

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully! You will receive a confirmation email shortly.",
        booking: {
          id: booking.id,
          sessionType: booking.sessionType,
          status: booking.status,
          createdAt: booking.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch user's bookings
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to view bookings" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        bookings: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      bookings: user.bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
