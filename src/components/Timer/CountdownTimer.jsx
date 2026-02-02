import { Component } from 'react'
import "./CountdowmTimer.css"

const STORAGE_KEY = 'countdown_timer_state'

class CountdownTimer extends Component {
  state = {
    inputSeconds: 10,
    remainingMs: 10000,
    status: 'idle', 
  }

  timerId = null
  endTime = null

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      try {
        const data = JSON.parse(saved)

        this.setState(
          {
            inputSeconds: data.inputSeconds,
            remainingMs: data.remainingMs,
            status: data.status,
          },
          () => {
            if (data.status === 'running') {
              const diff = data.endTime - Date.now()

              if (diff <= 0) {
                this.completeTimer()
              } else {
                this.remainingMs = diff
                this.endTime = data.endTime
                this.startInterval()
              }
            }
          },
        )
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        inputSeconds: this.state.inputSeconds,
        remainingMs: this.state.remainingMs,
        status: this.state.status,
        endTime: this.endTime,
      }),
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startInterval = () => {
    clearInterval(this.timerId)

    this.timerId = setInterval(() => {
      const diff = this.endTime - Date.now()

      if (diff <= 0) {
        this.completeTimer()
      } else {
        this.setState({ remainingMs: diff })
      }
    }, 10)
  }

  startTimer = () => {
    const { inputSeconds } = this.state

    const ms = inputSeconds * 1000
    this.endTime = Date.now() + ms

    this.setState(
      {
        remainingMs: ms,
        status: 'running',
      },
      this.startInterval,
    )
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.setState({ status: 'paused' })
  }

  resumeTimer = () => {
    const { remainingMs } = this.state

    this.endTime = Date.now() + remainingMs

    this.setState({ status: 'running' }, this.startInterval)
  }

  resetTimer = () => {
    clearInterval(this.timerId)

    const ms = this.state.inputSeconds * 1000

    this.endTime = null

    this.setState({
      remainingMs: ms,
      status: 'idle',
    })
  }

  completeTimer = () => {
    clearInterval(this.timerId)

    this.setState({
      remainingMs: 0,
      status: 'completed',
    })
  }

  onChangeSeconds = event => {
    const value = event.target.value

    if (/^\d*$/.test(value)) {
      const seconds = value === '' ? '' : Number(value)

      this.setState({
        inputSeconds: seconds,
        remainingMs: seconds * 1000,
      })
    }
  }

  formatTime = () => {
    const { remainingMs } = this.state

    const seconds = Math.floor(remainingMs / 1000)
    const milliseconds = Math.floor((remainingMs % 1000) / 10)

    const s = seconds > 9 ? seconds : `0${seconds}`
    const ms = milliseconds > 9 ? milliseconds : `0${milliseconds}`

    return `${s}:${ms}`
  }

  render() {
    const { inputSeconds, status } = this.state

    const isRunning = status === 'running'
    const isPaused = status === 'paused'
    const isCompleted = status === 'completed'

    return (
      <div className="bg-container">
        <h1>Countdown Timer</h1>

        <div className="stopwatchContainer">
          <p>Timer</p>
          <input
            type="text"
            value={inputSeconds}
            disabled={isRunning}
            onChange={this.onChangeSeconds}
          />

          <h1>{this.formatTime()}</h1>

          <p>Status : {status}</p>

          {isCompleted && <h3>Time’s up!</h3>}

          <div>
            {status !== 'completed' && (
              <button
                className="start-btn"
                type="button"
                disabled={isRunning || isPaused || inputSeconds <= 0}
                onClick={this.startTimer}
              >
                Start
              </button>
            )}

            <button
              className="stop-btn"
              type="button"
              disabled={!isRunning}
              onClick={this.pauseTimer}
            >
              Pause
            </button>

            <button
              className="resume-btn"
              type="button"
              disabled={!isPaused}
              onClick={this.resumeTimer}
            >
              Resume
            </button>

            <button
              className="reset-btn"
              type="button"
              onClick={this.resetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CountdownTimer
