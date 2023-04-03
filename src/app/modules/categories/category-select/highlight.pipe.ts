import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
	name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: string, searchValue: string): any {
		if (!searchValue) return value

		const re = new RegExp(searchValue, 'gi')
		const match = value.match(re)

		// If there's no match, just return the original value.
		if (!match) {
			return value
		}

		const replacedValue = value.replace(re, '<mark>' + match[0] + '</mark>')
		return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
	}
}
