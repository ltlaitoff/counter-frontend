import { createAction, props } from '@ngrx/store'
import { AddCategoryInputs } from 'src/types/ApiInputs'
import { Category } from 'src/types/Category'

const TAG = '[API Categories]'

/* Load */
export const loadCategories = createAction(
	`${TAG} Load Categories`,
	(props: { force: boolean } = { force: false }) => props
)

export const categoriesLoadedSuccess = createAction(
	`${TAG} Categories Loaded Success`,
	props<{ payload: Category[] }>()
)

export const categoriesLoadedError = createAction(
	`${TAG} Categories Loaded Error`
)

/* Add */
export const addCategory = createAction(
	`${TAG} Add new category`,
	(category: AddCategoryInputs) => category
)

export const addCategorySuccess = createAction(
	`${TAG} Add new category success`,
	(category: Category) => category
)

/* Delete */
export const deleteCategory = createAction(
	`${TAG} Delete new category`,
	props<{ id: string }>()
)

export const deleteCategorySuccess = createAction(
	`${TAG} Delete category success`,
	props<{ id: string }>()
)
