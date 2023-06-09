import { Component, forwardRef, Input, SimpleChanges } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'

@Component({
	selector: 'counter-category-select-multi',
	templateUrl: './category-select-multi.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CategorySelectMultiComponent),
			multi: true
		}
	]
})
export class CategorySelectMultiComponent implements ControlValueAccessor {
	@Input() categories: CategoryStateItemWithColor[] | null = null
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] | null = null
	@Input() buttonClass: string = ''
	// `value` is stub for sync formControlName work in adaptive
	@Input() value: string[] | null | undefined = null

	ngOnInit() {
		console.log('rerender')
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['value'] && !changes['value'].firstChange) {
			this.currentId = changes['value'].currentValue
		}
	}

	isDropDownOpened = false

	disabled = false
	currentId: string[] = []

	onChange: any = () => {}
	onTouched: any = () => {}

	onItemClick(id: string | null) {
		console.log(id)
		console.log('onItemClick')

		if (id === null) return

		console.log(this.currentId, id)

		if (this.currentId.includes(id)) {
			this.currentId = this.currentId.filter(item => item !== id)
		} else {
			this.currentId.push(id)
		}

		console.log(this.currentId)

		this.onChange(this.currentId)
	}

	writeValue(value: string[]): void {
		this.currentId = value
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

	closeDropDown() {
		this.isDropDownOpened = false
	}

	toggleDropDown() {
		this.isDropDownOpened = !this.isDropDownOpened
	}
}
