export default async function App({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <div>Page for {code}</div>;
}
