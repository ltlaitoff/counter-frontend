import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'

@Component({
	selector: 'counter-category-select',
	templateUrl: './category-select.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CategorySelectComponent),
			multi: true
		}
	]
})
export class CategorySelectComponent implements ControlValueAccessor {
	@Input() categories: CategoryStateItemWithColor[] | null = null
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] | null = null
	@Input() buttonClass: string = ''

	ngOnInit() {
		console.log('rerender')
	}

	isDropDownOpened = false

	disabled = false
	currentId: string | null = null
	currentCategory: CategoryStateItemWithColor | null = null

	onChange: any = () => {}
	onTouched: any = () => {}

	onItemClick(id: string | null) {
		console.log('onItemClick')

		this.currentId = id

		this.onChange(id)
		this.setCurrentCategory()
		this.isDropDownOpened = false
	}

	writeValue(value: string): void {
		this.currentId = value
		this.setCurrentCategory()
	}

	registerOnChange(callback: (_: any) => void): void {
		this.onChange = callback
	}

	registerOnTouched(callback: (_: any) => void): void {
		this.onTouched = callback
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled
	}

	setCurrentCategory() {
		if (this.categories) {
			this.currentCategory =
				this.categories.find(category => category._id === this.currentId) ||
				null
		}
	}

	closeDropDown() {
		this.isDropDownOpened = false
	}

	toggleDropDown() {
		this.isDropDownOpened = !this.isDropDownOpened
	}
}
