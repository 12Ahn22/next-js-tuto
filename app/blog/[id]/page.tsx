import { fetchTest } from "@/app/lib/data";
import Link from "next/link";

interface PageProps {
  params: { id: number };
}

export default async function Page({ params }: PageProps) {
  const tests = await fetchTest(params.id);

  return (
    <div>
      <h2>{tests?.title}</h2>
      <h3>{params.id}</h3>
      <Link href={`${Number(params.id) - 1}`}>이전 블로그</Link>
      <Link href={`${Number(params.id) + 1}`}>다음 블로그</Link>
    </div>
  );
}
