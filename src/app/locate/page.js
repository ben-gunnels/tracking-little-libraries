import prisma from "../../../lib/prisma"
import LocationForm from "./LocationForm";

export default async function LocatePage({ searchParams }) {
  const token = searchParams?.token;

  const tokenRecord = await prisma.qrToken.findUnique({
    where: { token },
  });

  if (!tokenRecord || tokenRecord.used) {
    return <p className="text-red-600">Invalid or expired QR code.</p>;
  }

  return <LocationForm token={token} />;
}