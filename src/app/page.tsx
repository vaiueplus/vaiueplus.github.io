import Image from 'next/image'
import FieldSelectionPage from './procedural/topic/page'
import Link from 'next/link'

export default function Home() {

  console.log(process.env.ROOT_PATH);

  return (
    <div>
      <FieldSelectionPage></FieldSelectionPage>
    </div>
  )
}
