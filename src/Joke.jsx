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
      <>
        <h1 className='title'>ジョークゲッター</h1>
        <div className='container'>
          <SetView set={this.state.setup} />
          <FemaleImage />
          <PunchView punch={this.state.punchline} />
          <MaleImage />
        </div>
        <div className='good'>
          <GoodButton className='good' />
        </div>
        <div className='reload'>
          <ReloadButton className='reload' />
        </div>
      </>
    )
  }
}

/* ジョーク部分 */
const SetView = props => {
  return <h2>フリ：{props.set}</h2>
}

const PunchView = props => {
  return <h2>オチ：{props.punch}</h2>
}

/* リロードボタン */
const ReloadButton = props => {
  const refreshPage = event => window.location.reload()
  return (
    <Button variant='contained' onClick={refreshPage}>
      One More Joke!
    </Button>
  )
}

/* イイねボタン */
const GoodButton = props => {
  const [count, counter] = React.useState(0)
  const handleClick = event => counter(count + 1)
  return (
    <Button variant='contained' color='primary' onClick={handleClick}>
      イイね👍：{count}
    </Button>
  )
}

/* 人物の画像をランダムに返す */
const MaleImage = props => {
  return (
    <img
      src='https://joeschmoe.io/api/v1/male/random'
      width='200'
      height='200'
      alt='human'
    />
  )
}

const FemaleImage = props => {
  return (
    <img
      src='https://joeschmoe.io/api/v1/female/random'
      width='200'
      height='200'
      alt='human'
    />
  )
}

export default Joke
