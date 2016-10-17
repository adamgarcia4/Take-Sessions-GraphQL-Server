//**************Fake Data********************
export const usersList = [
	{
		_id: 'U1',
		name: 'Adam',
		teacherID: 'T1',
		studentID: 'S1'
	},
	{
		_id: 'U2',
		name: 'JJ',
		studentID: 'S2'
	}
];

export const studentsList = [
	{
		_id: 'S1',
		userID: 'U1',
		courseGroupID: [
			'CG1',
			'CG2'
		]
	},
	{
		_id: 'S2',
		userID: 'U2',
		courseGroupID: [
			'CG2',
			'CG3',
			'CG1'
		]
	}
];

export const teachersList = [
	{
		_id: 'T1',
		userID: 'U1',
		genre: 'house',
		courseID: [
			'C1',
			'C3'
		],
		courseGroupID: [
			'CG1',
			'CG2'
		]
	},
	{
		_id: 'T2',
		userID: 'U2',
		genre: 'pop',
		courseID: [
			'C1',
			'C2'
		],
		courseGroupID: [
			'CG2',
			'CG3'
		]
	}
];

export const coursesList = [
	{
		_id: 'C1',
		name: 'course 1',
		teacherID: [
			'T1',
			'T2'
		],
		courseGroupID: [
			'CG1',
			'CG2'
		]
	},
	{
		_id: 'C2',
		name: 'course 2',
		teacherID: [
			'T2'
		],
		courseGroupID: [
			'CG3'
		]
	},
	{
		_id: 'C3',
		name: 'course 3',
		teacherID: [

		],
		courseGroupID: [

		]

	}
];

export const courseGroupList = [
	{
		_id: 'CG1',
		courseID: 'C1',
		studentID: [
			'S1',
			'S2'
		],
		teacherID: [
			'T1'
		],
		sessionID: [
			'Sess1'
		]

	},
	{
		_id: 'CG2',
		courseID: 'C1',
		studentID: [
			'S1',
			'S2'
		],
		teacherID: [
			'T1',
			'T2'
		],
		sessionID: [
			'Sess2'
		]
	},
	{
		_id: 'CG3',
		courseID: 'C2',
		studentID: [
			'S1'
		],
		teacherID: [
			'T2'
		],
		sessionID: [
			'Sess1'
		]
	}
]

export const sessionsList = [
	{
		_id: 'Sess1',
		courseGroupID: 'CG1',
		paymentID: [
			'P1'
		]
	},
	{
		_id: 'Sess2',
		courseGroupID: 'CG2',
		paymentID: [
			'P2'
		]
	}
]

export const paymentsList = [
	{
		_id: 'P1',
		sessionID: 'Sess1'
	},
	{
		_id: 'P2',
		sessionID: 'Sess2'
	}

]