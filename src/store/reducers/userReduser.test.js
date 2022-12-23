import { userReduser } from './userReduser'
import * as types from '../actions/userActions'

describe('todos userReduser', () => {
  it('should return the initial state', () => {
    expect(userReduser(undefined, {})).toEqual(
      {
        accessToken: '',
        email: '',
        name: ''
      }
    )
  })

  it('should handle USER_REGISTER', () => {
    expect(
      userReduser({}, {
        type: types.USER_REGISTER,
        payload: {
          refreshToken: 'Run the tests Token',
          accessToken: 'Run the tests Token',
          user: {
            email: 'Run the tests Email',
            name: 'Run the tests Name'
          }
        }
      })
    ).toEqual(
      {
        accessToken: 'Run the tests Token',
        email: 'Run the tests Email',
        name: 'Run the tests Name',
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.USER_REGISTER,
          payload: {
            refreshToken: 'Run the tests Token',
            accessToken: 'Run the tests Token',
            user: {
              email: 'Run the tests Email',
              name: 'Run the tests Name'
            }
          }
        }
      )
    ).toEqual({
      accessToken: 'Run the tests Token',
      email: 'Run the tests Email',
      name: 'Run the tests Name'
    })
  })

  it('should handle USER_LOGIN', () => {
    expect(
      userReduser({}, {
        type: types.USER_LOGIN,
        payload: {
          refreshToken: 'Run the tests Token',
          accessToken: 'Run the tests Token',
          user: {
            email: 'Run the tests Email',
            name: 'Run the tests Name'
          }
        }
      })
    ).toEqual(
      {
        accessToken: 'Run the tests Token',
        email: 'Run the tests Email',
        name: 'Run the tests Name'
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.USER_LOGIN,
          payload: {
            refreshToken: 'Run the tests Token',
            accessToken: 'Run the tests Token',
            user: {
              email: 'Run the tests Email',
              name: 'Run the tests Name'
            }
          }
        }
      )
    ).toEqual({
      accessToken: 'Run the tests Token',
      email: 'Run the tests Email',
      name: 'Run the tests Name'
    })
  })

  it('should handle USER_TOKEN', () => {
    expect(
      userReduser({}, {
        type: types.USER_TOKEN,
        payload: {
          refreshToken: 'Run the tests Token',
          accessToken: 'Run the tests Token',
        }
      })
    ).toEqual(
      {
        accessToken: 'Run the tests Token',
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.USER_TOKEN,
          payload: {
            refreshToken: 'Run the tests Token',
            accessToken: 'Run the tests Token',
          }
        }
      )
    ).toEqual({
      accessToken: 'Run the tests Token',
      email: 'Use Redux',
      name: 'Use Redux'
    })
  })

  it('should handle USER_LOGOUT', () => {
    expect(
      userReduser({}, {
        type: types.USER_LOGOUT,
      })
    ).toEqual(
      {
        accessToken: null,
        email: '',
        name: '',
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.USER_LOGOUT,
        }
      )
    ).toEqual({
      accessToken: null,
      email: '',
      name: '',
    })
  })

  it('should handle GET_USER', () => {
    expect(
      userReduser({}, {
        type: types.GET_USER,
        payload: {
          user: {
            email: 'Run the tests Email',
            name: 'Run the tests Name'
          }
        }
      })
    ).toEqual(
      {
        email: 'Run the tests Email',
        name: 'Run the tests Name'
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.GET_USER,
          payload: {
            user: {
              email: 'Run the tests Email',
              name: 'Run the tests Name'
            }
          }
        }
      )
    ).toEqual({
      accessToken: 'Use Redux',
      email: 'Run the tests Email',
      name: 'Run the tests Name'
    })
  })

  it('should handle PATCH_USER', () => {
    expect(
      userReduser({}, {
        type: types.PATCH_USER,
        payload: {
          user: {
            email: 'Run the tests Email',
            name: 'Run the tests Name'
          }
        }
      })
    ).toEqual(
      {
        email: 'Run the tests Email',
        name: 'Run the tests Name'
      }
    )

    expect(
      userReduser(
        {
          accessToken: 'Use Redux',
          email: 'Use Redux',
          name: 'Use Redux',
        },
        {
          type: types.PATCH_USER,
          payload: {
            user: {
              email: 'Run the tests Email',
              name: 'Run the tests Name'
            }
          }
        }
      )
    ).toEqual({
      accessToken: 'Use Redux',
      email: 'Run the tests Email',
      name: 'Run the tests Name'
    })
  })
})