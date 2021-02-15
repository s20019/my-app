import React from 'react'
import { Button } from '@material-ui/core'
import './Joke.css'

class Joke extends React.Component {
  constructor (props) {
    super(props)
    this.URI = 'https://official-joke-api.appspot.com/jokes/random'
    this.state = { jokes: [] }
  }

  componentDidMount () {
    window
      .fetch(this.URI)
      .then(res => res.json())
      .then(data =>
        this.setState({ setup: data.setup, punchline: data.punchline })
      )
      .catch(console.log)
  }

  render () {
    return (
      <div className='container'>
        <h1>ジョークゲッター</h1>
        <TextView set={this.state.setup} punch={this.state.punchline} />
        <HumanImage />
        <GoodButton />
      </div>
    )
  }
}

/* ジョーク部分 */
const TextView = props => {
  return (
    <div>
      <h2>フリ：{props.set}</h2>
      <h2>オチ：{props.punch}</h2>
    </div>
  )
}

/* イイねボタン */
const GoodButton = props => {
  const [count, counter] = React.useState(0)
  const handleChange = event => counter(count + 1)
  return (
    <Button variant='contained' color='primary' onClick={handleChange}>
      イイね👍：{count}
    </Button>
  )
}

/* 人物の画像をランダムに返す */
const HumanImage = props => {
  return (
    <img
      src='https://joeschmoe.io/api/v1/random'
      width='200'
      height='200'
      alt='human'
    />
  )
}

export default Joke
