const tel = (tel: string) => `tel:${tel.replace(/[^0-9\+]+/g, '')}`;

const forceTransfer = (str: string | null, n: number) =>
	str ? str.replace(new RegExp(`((?:[^ ]* +){${n - 1}}[^ ]*) `), '$1<br>') : '';

const splitText = (str: string | null, n: number, part: number = 1) =>
	str
		? str.replace(new RegExp(`((?:[^ ]* +){${n - 1}}[^ ]*) (.*)`), '$1&&$2').split('&&')[
				part - 1
			]
		: '';

const pluralize = (n: number, pluralize: [string, string, string]) =>
	n % 10 === 1 && n % 100 !== 11
		? pluralize[0]
		: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? pluralize[1]
			: pluralize[2];

const formatPrice = (price: number) =>
	price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });

const formatCredit = (price: number, creditPeriod: number) =>
	`${formatPrice(price / creditPeriod)} x ${creditPeriod} ${pluralize(creditPeriod, ['плятёж', 'платежа', 'платежей'])}`;

const accentedText = (text: string, accentWordNumbers: string) => {
	const accentedText = text.split(' ');
	const accentWordNumbersArray = accentWordNumbers.split(',');
	const accentedTextLength = accentedText.length;

	accentWordNumbersArray.forEach((accentWordNumber, index) => {
		const accentWordNumberNumber = Number(accentWordNumber);
		if (accentWordNumberNumber > accentedTextLength) return;

		accentedText[accentWordNumberNumber - 1] =
			`<span class="text-accent">${accentedText[accentWordNumberNumber - 1]}</span>`;
	});

	return accentedText.join(' ');
};

const formatDate = (date: string) =>
	new Date(date).toLocaleDateString('ru-Ru', { year: 'numeric', month: 'long', day: 'numeric' });

const trimString = (review: string, maxChars: number = 250) => {
	if (review.length > maxChars) {
		let charCount = 0;
		const trimReview = review.split(' ').reduce((acc, word) => {
			if (charCount > maxChars) {
				return acc;
			}
			charCount += word.length;
			acc.push(word);

			return acc;
		}, [] as string[]);

		return `${trimReview.join(' ')}...`;
	}

	return review;
};

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.config.globalProperties.$f = {
		tel,
		forceTransfer,
		splitText,
		pluralize,
		formatPrice,
		formatCredit,
		accentedText,
		formatDate,
		trimString,
	};

	return {
		provide: {
			f: {
				tel,
				forceTransfer,
				splitText,
				pluralize,
				formatPrice,
				formatCredit,
				accentedText,
				formatDate,
				trimString,
			},
		},
	};
});

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$f: {
			tel: typeof tel;
			forceTransfer: typeof forceTransfer;
			splitText: typeof splitText;
			pluralize: typeof pluralize;
			formatPrice: typeof formatPrice;
			formatCredit: typeof formatCredit;
			accentedText: typeof accentedText;
			formatDate: typeof formatDate;
			trimString: typeof trimString;
		};
	}
}
