import { constructorReduser } from './constructorReduser'
import * as types from '../actions/burgerIngredientsActions'

describe('todos modalIngredientReduser', () => {
  it('should return the initial state', () => {
    expect(constructorReduser(undefined, {})).toEqual(
      {
        constructorIngredients: [],
        constructorBun: null,
        totalConstructorPrice: 0,
      }
    )
  })

  it('should handle SET_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      constructorReduser({
        constructorIngredients: [],
      }, {
        type: types.SET_CONSTRUCTOR_INGREDIENTS,
        ingredient: {ingr: 'ingr3'},
      })
    ).toEqual(
      {
        constructorIngredients: [{ingr: 'ingr3'}],
      }
    )

    expect(
      constructorReduser(
        {
          constructorIngredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}],
          constructorBun: null,
          totalConstructorPrice: 0,
        },
        {
          type: types.SET_CONSTRUCTOR_INGREDIENTS,
          ingredient: {ingr: 'ingr3'},
        }
      )
    ).toEqual({
      constructorIngredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      constructorBun: null,
      totalConstructorPrice: 0,
    })
  })

  it('should handle UPDATE_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      constructorReduser({}, {
        type: types.UPDATE_CONSTRUCTOR_INGREDIENTS,
        ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      })
    ).toEqual(
      {
        constructorIngredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      }
    )

    expect(
      constructorReduser(
        {
          constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
          constructorBun: null,
          totalConstructorPrice: 0,
        },
        {
          type: types.UPDATE_CONSTRUCTOR_INGREDIENTS,
          ingredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
        }
      )
    ).toEqual({
      constructorIngredients: [{ingr: 'ingr1'}, {ingr: 'ingr2'}, {ingr: 'ingr3'}],
      constructorBun: null,
      totalConstructorPrice: 0,
    })
  })

  it('should handle DEL_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      constructorReduser({
        constructorIngredients: [],
      }, {
        type: types.DEL_CONSTRUCTOR_INGREDIENTS,
        curentIndex: 1,
      })
    ).toEqual(
      {
        constructorIngredients: [],
      }
    )

    expect(
      constructorReduser(
        {
          constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
          constructorBun: null,
          totalConstructorPrice: 0,
        },
        {
          type: types.DEL_CONSTRUCTOR_INGREDIENTS,
          curentIndex: 1,
        }
      )
    ).toEqual({
      constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr1'}],
      constructorBun: null,
      totalConstructorPrice: 0,
    })
  })

  it('should handle SET_CONSTRUCTOR_BUN', () => {
    expect(
      constructorReduser({}, {
        type: types.SET_CONSTRUCTOR_BUN,
        constructorBun: 'constructorBun',
      })
    ).toEqual(
      {
        constructorBun: 'constructorBun',
      }
    )

    expect(
      constructorReduser(
        {
          constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
          constructorBun: 'constructorBunDefault',
          totalConstructorPrice: 0,
        },
        {
          type: types.SET_CONSTRUCTOR_BUN,
          constructorBun: 'constructorBun',
        }
      )
    ).toEqual({
      constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
      constructorBun: 'constructorBun',
      totalConstructorPrice: 0,
    })
  })

  it('should handle SET_CONSTRUCTOR_PRICE', () => {
    expect(
      constructorReduser({}, {
        type: types.SET_CONSTRUCTOR_PRICE,
        thisTotalSumm: 123,
      })
    ).toEqual(
      {
        totalConstructorPrice: 123,
      }
    )

    expect(
      constructorReduser(
        {
          constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
          constructorBun: 'constructorBunDefault',
          totalConstructorPrice: 321,
        },
        {
          type: types.SET_CONSTRUCTOR_PRICE,
          thisTotalSumm: 123,
        }
      )
    ).toEqual({
      constructorIngredients: [{ingr: 'ingr3'}, {ingr: 'ingr2'}, {ingr: 'ingr1'}],
      constructorBun: 'constructorBunDefault',
      totalConstructorPrice: 123,
    })
  })
})