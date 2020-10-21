/** @jsx jsx */
import { jsx } from '@emotion/core'
import Tooltip from '@reach/tooltip'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { client } from 'utils/api-client'
import './bootstrap'
import { BookRow } from './components/book-row'
import { BookListUL, Input, Spinner } from './components/lib'

const Status = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Success: 'SUCCESS',
}

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState(Status.Idle)
  const [data, setData] = React.useState(null)
  const [query, setQuery] = React.useState('')
  const [hasQueried, setHasQueried] = React.useState(false)

  React.useEffect(() => {
    if (hasQueried && query) {
      async function main() {
        setStatus(Status.Loading)

        try {
          const data = await client(`books?query=${encodeURIComponent(query)}`)
          setStatus(Status.Success)
          setData(data)
        } catch (err) {}
      }
      main()
    }
  }, [query, hasQueried])

  // 🐨 replace these with derived state values based on the status.
  const isLoading = status === Status.Loading
  const isSuccess = status === Status.Success

  function handleSearchSubmit(event) {
    event.preventDefault()
    setHasQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{ maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: '100%' }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map(book => (
              <li key={book.id}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export { DiscoverBooksScreen }
