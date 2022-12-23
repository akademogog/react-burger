import { modalIngredientReduser } from './modalIngredientReduser'
import * as types from '../actions/burgerIngredientsActions'

describe('todos modalIngredientReduser', () => {
  it('should return the initial state', () => {
    expect(modalIngredientReduser(undefined, {})).toEqual(
      {
        currentIngredient: null,
      }
    )
  })

  it('should handle SET_CURRENT_INGREDIENT', () => {
    expect(
      modalIngredientReduser({}, {
        type: types.SET_CURRENT_INGREDIENT,
        currentIngredient: 'IngredientObject',
      })
    ).toEqual(
      {
        currentIngredient: 'IngredientObject',
      }
    )

    expect(
      modalIngredientReduser(
        {
          currentIngredient: 'IngredientObjectDefault',
        },
        {
          type: types.SET_CURRENT_INGREDIENT,
          currentIngredient: 'IngredientObject',
        }
      )
    ).toEqual({
      currentIngredient: 'IngredientObject',
    })
  })

  it('should handle DEL_CURRENT_INGREDIENT', () => {
    expect(
      modalIngredientReduser({}, {
        type: types.DEL_CURRENT_INGREDIENT,
      })
    ).toEqual(
      {
        currentIngredient: null,
      }
    )

    expect(
      modalIngredientReduser(
        {
          currentIngredient: 'IngredientObjectDefault',
        },
        {
          type: types.DEL_CURRENT_INGREDIENT,
        }
      )
    ).toEqual({
      currentIngredient: null,
    })
  })
})