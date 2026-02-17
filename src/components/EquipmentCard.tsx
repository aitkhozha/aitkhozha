import Link from 'next/link';

type Props = {
  slug: string;
  name: string;
  category: string;
  dayRate: number;
  weekendRate: number;
};

export function EquipmentCard({ slug, name, category, dayRate, weekendRate }: Props) {
  return (
    <article className="card">
      <h3><Link href={`/equipment/${slug}`}>{name}</Link></h3>
      <p>{category}</p>
      <p>Day £{(dayRate / 100).toFixed(2)} · Weekend £{(weekendRate / 100).toFixed(2)}</p>
    </article>
  );
}
