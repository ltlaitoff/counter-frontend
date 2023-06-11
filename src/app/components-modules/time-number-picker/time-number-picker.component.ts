import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
	SimpleChanges
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
	selector: 'counter-time-number-picker',
	templateUrl: './time-number-picker.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TimeNumberPickerComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeNumberPickerComponent implements ControlValueAccessor {
	@Input() inputClass = ''
	@Input() inputId = ''
	@Input() inputTimeShow = false
	@Input() inputNumberShow = true
	// `value` is stub for sync formControlName work in adaptive
	@Input() value: number | null | undefined = null

	numberValue: number | null = null

	ngOnChanges(changes: SimpleChanges) {
		if (changes['value'] && !changes['value'].firstChange) {
			this.numberValue = changes['value'].currentValue
		}
	}

	onNumberValueChange() {
		this.markAsTouched()

		if (this.disabled) return

		this.onChange(this.numberValue)
	}

	get timeValue() {
		// TODO: Func transform seconds to time-string
		if (this.numberValue === null) return '00:00:00 AM'

		const absNumberValueInSeconds = Math.abs(this.numberValue)

		const output = new Date(absNumberValueInSeconds * 1000)

		console.log(output.toLocaleTimeString('en-GB', { timeZone: 'UTC' }))

		return output.toLocaleTimeString('en-GB', { timeZone: 'UTC' })
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
		const [hours, minutes, seconds] = newTime.split(':').map(Number)

		return hours * 60 * 60 + minutes * 60 + seconds
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
