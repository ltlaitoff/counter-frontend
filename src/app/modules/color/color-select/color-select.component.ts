import { Component } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectColors } from 'src/app/store/colors'
import { Color } from 'src/types/Color'

@Component({
	selector: 'counter-color-select',
	templateUrl: './color-select.component.html',
	styleUrls: ['color-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: ColorSelectComponent
		}
	]
})
export class ColorSelectComponent implements ControlValueAccessor {
	colors: Color[] | null = null
	choicedColorId: string | null = null

	ngOnInit() {
		this.store.select(selectColors).subscribe(newColors => {
			this.colors = newColors

			if (this.choicedColorId === null) {
				this.setFirstColorAsChoiced(newColors)
			}
		})
	}

	private setFirstColorAsChoiced(colors: Color[]) {
		this.markAsTouched()

		this.choicedColorId = colors[0]?._id || null

		this.onChange(this.choicedColorId)
	}

	get sortedByOrderColors() {
		return sortedByOrder(this.colors)
	}

	checkColor(colorId: string) {
		this.markAsTouched()

		if (this.disabled) return

		this.choicedColorId = colorId
		this.onChange(colorId)
	}

	onChange: any = (colorId: string) => {}
	onTouched: any = () => {}

	disabled: boolean = false
	touched: boolean = false

	writeValue(colorId: string | null): void {
		if (colorId === null) {
			if (this.colors) this.setFirstColorAsChoiced(this.colors)

			return
		}

		this.choicedColorId = colorId
	}

	registerOnChange(callback: (_: any) => void): void {
		this.onChange = callback
	}

	registerOnTouched(callback: (_: any) => void): void {
		this.onTouched = callback
	}

	setDisabledState(disabled: boolean) {
		this.disabled = disabled
	}

	markAsTouched() {
		if (!this.touched) {
			this.onTouched()
			this.touched = true
		}
	}

	constructor(private store: Store<RootState>) {}
}
