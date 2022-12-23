import { modalOrderReduser } from './modalOrderReduser'
import * as types from '../actions/burgerIngredientsActions'

describe('todos modalOrderReduser', () => {
  it('should return the initial state', () => {
    expect(modalOrderReduser(undefined, {})).toEqual(
      {
        number: null,
        isLoad: false,
      }
    )
  })

  it('should handle SET_ORDER_NUMBER', () => {
    expect(
      modalOrderReduser({}, {
        type: types.SET_ORDER_NUMBER,
        number: 321
      })
    ).toEqual(
      {
        number: 321,
      }
    )

    expect(
      modalOrderReduser(
        {
          number: 123,
          isLoad: false,
        },
        {
          type: types.SET_ORDER_NUMBER,
          number: 321,
        }
      )
    ).toEqual({
      number: 321,
      isLoad: false,
    })
  })

  it('should handle SEND_ORDER', () => {
    expect(
      modalOrderReduser({}, {
        type: types.SEND_ORDER,
      })
    ).toEqual(
      {
        isLoad: true,
        number: null,
      }
    )

    expect(
      modalOrderReduser(
        {
          number: 123,
          isLoad: false,
        },
        {
          type: types.SEND_ORDER,
        }
      )
    ).toEqual({
      isLoad: true,
      number: null,
    })
  })

  it('should handle SEND_ORDER_SUCCESS', () => {
    expect(
      modalOrderReduser({}, {
        type: types.SEND_ORDER_SUCCESS,
      })
    ).toEqual(
      {
        isLoad: false,
      }
    )

    expect(
      modalOrderReduser(
        {
          number: 123,
          isLoad: true,
        },
        {
          type: types.SEND_ORDER_SUCCESS,
        }
      )
    ).toEqual({
      number: 123,
      isLoad: false,
    })
  })
})