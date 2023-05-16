import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'

@Component({
	selector: 'counter-home-main-input',
	templateUrl: './home-main-input.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => HomeMainInputComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeMainInputComponent implements ControlValueAccessor {
	@Input({ required: true })
	choicedCategory: CategoryStateItemWithColor | null = null

	numberValue: number | null = null

	ngOnInit() {}

	onNumberValueChange() {
		this.markAsTouched()

		if (this.disabled) return

		this.onChange(this.numberValue)
	}

	get timeValue() {
		if (this.numberValue === null) return '00:00 AM'

		const absNumberValue = Math.abs(this.numberValue)

		let hours = Math.floor(absNumberValue / 60)
		const minutes = absNumberValue - hours * 60

		if (hours > 23) {
			hours = 23
		}

		const hoursAsString = this.tranformNumberToTwoDigit(hours)
		const minutesAsString = this.tranformNumberToTwoDigit(minutes)

		return `${hoursAsString}:${minutesAsString}`
	}

	set timeValue(newTime: string | null) {
		console.log(newTime)

		if (this.disabled) return
		if (newTime === null) return

		this.numberValue = this.tranformTimeToSeconds(newTime)
		this.onNumberValueChange()
	}

	private tranformNumberToTwoDigit(value: number) {
		const valueAsString = String(value)

		return `${valueAsString.length === 1 ? '0' : ''}${valueAsString}`
	}

	private tranformTimeToSeconds(newTime: string) {
		const [minutes, seconds] = newTime.split(':').map(Number)

		return minutes * 60 + seconds
	}

	onChange: any = (value: number) => {}
	onTouched: any = () => {}

	disabled: boolean = false
	touched: boolean = false

	writeValue(newValue: number | null): void {
		this.numberValue = newValue
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
}
