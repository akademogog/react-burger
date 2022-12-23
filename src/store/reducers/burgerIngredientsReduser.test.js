import { burgerIngredientsReduser } from './burgerIngredientsReduser'
import * as types from '../actions/burgerIngredientsActions'

describe('todos modalIngredientReduser', () => {
  it('should return the initial state', () => {
    expect(burgerIngredientsReduser(undefined, {})).toEqual(
      {
        isLoading: false,
        isError: false,
        ingredients: [],
      }
    )
  })

  it('should handle LOAD_INGREDIENTS_REQUEST', () => {
    expect(
      burgerIngredientsReduser({}, {
        type: types.LOAD_INGREDIENTS_REQUEST,
        isLoading: true,
      })
    ).toEqual(
      {
        isLoading: true,
      }
    )

    expect(
      burgerIngredientsReduser(
        {
          isLoading: false,
          isError: false,
          ingredients: [],
        },
        {
          type: types.LOAD_INGREDIENTS_REQUEST,
          isLoading: true,
        }
      )
    ).toEqual({
      isLoading: true,
      isError: false,
      ingredients: [],
    })
  })

  it('should handle LOAD_INGREDIENTS_SUCCESS', () => {
    expect(
      burgerIngredientsReduser({}, {
        type: types.LOAD_INGREDIENTS_SUCCESS,
        ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      })
    ).toEqual(
      {
        ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      }
    )

    expect(
      burgerIngredientsReduser(
        {
          isLoading: false,
          isError: false,
          ingredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}]
        },
        {
          type: types.LOAD_INGREDIENTS_SUCCESS,
          ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}]
        }
      )
    ).toEqual({
      isLoading: false,
      isError: false,
      ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}]
    })
  })

  it('should handle LOAD_INGREDIENTS_ERROR', () => {
    expect(
      burgerIngredientsReduser({}, {
        type: types.LOAD_INGREDIENTS_ERROR,
        isError: true,
      })
    ).toEqual(
      {
        isError: true,
      }
    )

    expect(
      burgerIngredientsReduser(
        {
          isLoading: false,
          isError: false,
          ingredients: [],
        },
        {
          type: types.LOAD_INGREDIENTS_ERROR,
          isError: true,
        }
      )
    ).toEqual({
      isLoading: false,
      isError: true,
      ingredients: [],
    })
  })

  it('should handle UPDATE_INGREDIENTS', () => {
    expect(
      burgerIngredientsReduser({}, {
        type: types.UPDATE_INGREDIENTS,
        ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      })
    ).toEqual(
      {
        ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      }
    )

    expect(
      burgerIngredientsReduser(
        {
          isLoading: false,
          isError: false,
          ingredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}]
        },
        {
          type: types.UPDATE_INGREDIENTS,
          ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}]
        }
      )
    ).toEqual({
      isLoading: false,
      isError: false,
      ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}]
    })
  })
})