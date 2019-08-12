export const AppConfig = Object.freeze({
	BASE_API_URL: 'http://localhost:8080',
	PAYMENTS_COLUMNS: [
		{
			value: 'dateService', 
			viewValue: 'Date Service'
		},
		{
			value: 'datePayment', 
			viewValue: 'Date Payment'
		},
		{
			value: 'amount', 
			viewValue: 'Amount'
		},
		{
			value: 'concept', 
			viewValue: 'Concept'
		},
		{
			value: 'checkNumber', 
			viewValue: 'Check Number'
		},
		{
			value: 'lastDigits', 
			viewValue: 'Last Digits'
		},
		{
			value: 'authorization', 
			viewValue: 'Authorization'
		},
		{
			value: 'numberAccount', 
			viewValue: 'Number Account'
		},
		{
			value: 'nameBank', 
			viewValue: 'Name Bank'
		},
		{
			value: 'typePayment', 
			viewValue: 'Type Payment'
		},
	],
	COLUMNS: [
		'typePayment',
		'dateService', 
		'datePayment',
		'checkNumber',
		'lastDigits',
		'authorization',
		'numberAccount',
		'nameBank', 
		'concept',
		'amount'
	],
	TYPE_PAYMENTS: {
		CASH: 'CASH',
		CHECK: 'CHECK',
		CARD: 'CARD',
		TRANSFER: 'TRANSFER'
	},
	ORDERS: {
		ASC: 'ASC',
		DESC: 'DESC'
	}
});
