import HotTopicPage from './hottopic/page'

export default function Home() {

  console.log(process.env.ROOT_PATH);

  return (
    <div>
      <HotTopicPage></HotTopicPage>
    </div>
  )
}
