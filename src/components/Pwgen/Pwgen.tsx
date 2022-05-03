import { useState, useEffect } from 'react'
import copy from 'copy-text-to-clipboard'
import pwgen from '@/utils/pwgen'

export default function Pwgen () {
  const [ symbols, setSymbols ] = useState(true)
  const [ numbers, setNumbers ] = useState(true)
  const [ len, setLen ] = useState(8)
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    setPassword(pwgen({
      symbols,
      numbers,
      len,
    }))
  }, [ symbols, numbers, len ])

  return (
    <section className="shadow rounded-3 overflow-hidden">
      <header className="d-flex align-items-start bg-primary text-white h2 m-0 p-3">
        <div className="user-select-all text-break flex-fill">
          {password}
        </div>

        <button
          type="button"
          aria-label="Copy password to clipboard"
          className="btn btn-link p-0 text-white ms-3"
          onClick={() => copy(password)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16"><path fill="currentColor" d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z"/></svg>
        </button>
      </header>
      <div className="p-3">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="len" className="form-label">
              {len} characters
            </label>
            <input
              type="range"
              className="form-range"
              id="len"
              min="4"
              max="32"
              step="1"
              value={len}
              onChange={event => setLen(event.target.valueAsNumber)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="symbols"
                checked={symbols}
                onChange={event => setSymbols(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="symbols">
                Symbols
              </label>
            </div>
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="numbers"
                checked={numbers}
                onChange={event => setNumbers(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="numbers">
                Numbers
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}