import {submitForm} from '../api/index'
import React from 'react'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'
import App from '../app'

jest.mock('../api/index', () => {})

describe('Main component', () => {
  test('renders Home component when on Home route', () => {
    render(
      <Router>
        <Main />
      </Router>,
    )
    expect(screen.getByText('You are home')).toBeInTheDocument()
  })
})

describe('App component', () => {
  test('renders "Welcome home" heading in the document', () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    expect(screen.getByText('Welcome home')).toBeInTheDocument()
  })

  test('renders "Fill out the form" link in the document', () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    expect(screen.getByText('Fill out the form')).toBeInTheDocument()
  })

  test('user is redirected to Page 1 after clicking the "Fill out the form" link', async () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    fireEvent.click(screen.getByText('Fill out the form'))
    await waitFor(() => {
      expect(screen.getByText('Page 1')).toBeInTheDocument()
      expect(screen.getByText('Go Home')).toBeInTheDocument()
      expect(screen.getByText('Favorite Food')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
    })
  })

  test('favorite food value', async () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    const favoriteFoodInput = screen.getByLabelText('Favorite Food')
    fireEvent.change(favoriteFoodInput, {target: {value: 'Les pâtes'}})
    expect(favoriteFoodInput).toHaveValue('Les pâtes')
  })

  test('click on Next', async () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => {
      expect(screen.getByText('Page 2')).toBeInTheDocument()
      expect(screen.getByText('Go Back')).toBeInTheDocument()
      expect(screen.getByText('Favorite Drink')).toBeInTheDocument()
      expect(screen.getByText('Review')).toBeInTheDocument()
    })
  })

  test('favorite drink value', async () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    const favoriteDrinkInput = screen.getByLabelText('Favorite Drink')
    fireEvent.change(favoriteDrinkInput, {target: {value: 'Bière'}})
    expect(favoriteDrinkInput).toHaveValue('Bière')
  })

  test('review link', async () => {
    render(
      <Router>
        <App />
      </Router>,
    )
    fireEvent.click(screen.getByText('Review'))
    await waitFor(() => {
      expect(screen.getAllByText('Confirm')).toHaveLength(2)
      expect(
        screen.getByText('Please confirm your choices'),
      ).toBeInTheDocument()
    })
  })
})
