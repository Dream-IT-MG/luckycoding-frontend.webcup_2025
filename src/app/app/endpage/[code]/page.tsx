export default function App({ params }: { params: { code: string } }) {
  return <div>Page for {params.code}</div>;
}
