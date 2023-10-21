import FieldSelectionPage from './procedural/topic/page'

export default function Home() {

  console.log(process.env.ROOT_PATH);

  return (
    <div>
      <FieldSelectionPage></FieldSelectionPage>
    </div>
  )
}
