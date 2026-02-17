import { cookies } from 'next/headers';
import { sessionCookieName, verifySession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const token = cookies().get(sessionCookieName)?.value;
  const session = verifySession(token);
  if (!session) return <div className="container"><h1>Admin login required</h1><p>POST credentials to /api/admin/login then refresh.</p></div>;
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, include: { items: { include: { equipment: true } } } });

  return (
    <div className="container">
      <h1>Admin dashboard</h1>
      {enquiries.map((e) => (
        <article key={e.id} className="card">
          <h2>{e.productionName} · {e.status}</h2>
          <p>{e.contactName} · {e.contactEmail}</p>
          <p>Estimate £{(e.totalEstimate / 100).toFixed(2)} + VAT £{(e.vatEstimate / 100).toFixed(2)}</p>
        </article>
      ))}
    </div>
  );
}
