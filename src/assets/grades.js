const gradesData = [
  {
    name: '1',
    uiaa: 'I',
    sport: 1,
    usa: 4 + ' class',
    v_grade: '',
    fb: ''
  },
  {
    name: '2',
    uiaa: 'II',
    sport: 2,
    usa: 5.1,
    v_grade: '',
    fb: ''
  },
  {
    name: '3-',
    uiaa: 'III-',
    sport: 3 + 'a',
    usa: 5.2,
    v_grade: '',
    fb: ''
  },
  {
    name: '3',
    uiaa: 'III',
    sport: 3 + 'b',
    usa: 5.3,
    v_grade: '',
    fb: ''
  },
  {
    name: '3+',
    uiaa: 'III+',
    sport: 3 + 'c',
    usa: 5.4,
    v_grade: '',
    fb: ''
  },
  {
    name: '4-',
    uiaa: 'IV-',
    sport: 4 + 'a',
    usa: 5.5,
    v_grade: '',
    fb: ''
  },
  {
    name: '4',
    uiaa: 'IV',
    sport: 4 + 'b',
    usa: 5.6,
    v_grade: '',
    fb: ''
  },
  {
    name: '4+',
    uiaa: 'IV+',
    sport: 4 + 'c',
    usa: 5.6,
    v_grade: '',
    fb: ''
  },
  {
    name: '5-',
    uiaa: 'V-',
    sport: 5 + 'a',
    usa: 5.7,
    v_grade: '',
    fb: ''
  },
  {
    name: '5',
    uiaa: 'V',
    sport: 5 + 'a+',
    usa: 5.7,
    v_grade: '',
    fb: ''
  },
  {
    name: '5+',
    uiaa: 'V+',
    sport: 5 + 'b',
    usa: 5.8,
    v_grade: '',
    fb: ''
  },
  {
    name: '5+/6-',
    uiaa: 'V+/VI-',
    sport: 5 + 'b+',
    usa: 5.8,
    v_grade: 'VB',
    fb: 3
  },
  {
    name: '6-',
    uiaa: 'VI-',
    sport: 5 + 'c',
    usa: 5.9,
    v_grade: 'V' + 0 + '-',
    fb: 4 + '-'
  },
  {
    name: '6',
    uiaa: 'VI',
    sport: 5 + 'c+',
    usa: 5.9,
    v_grade: 'V' + 0 + '-',
    fb: 4
  },
  {
    name: '6+',
    uiaa: 'VI+',
    sport: 6 + 'a',
    usa: 5.10 + 'a',
    v_grade: 'V' + 0,
    fb: 4 + '+'
  },
  {
    name: '6+/7-',
    uiaa: 'VI+/VII-',
    sport: 6 + 'a+',
    usa: 5.10 + 'b',
    v_grade: 'V' + 0,
    fb: 5 + '-'
  },
  {
    name: '7-',
    uiaa: 'VII-',
    sport: 6 + 'a+',
    usa: 5.10 + 'c',
    v_grade: 'V' + 0 + '+',
    fb: 5
  },
  {
    name: '7',
    uiaa: 'VII',
    sport: 6 + 'b',
    usa: 5.10 + 'd',
    v_grade: 'V' + 0 + '+',
    fb: 5 + '+'
  },
  {
    name: '7+',
    uiaa: 'VII+',
    sport: 6 + 'b+',
    usa: 5.11 + 'a',
    v_grade: 'V' + 1,
    fb: 5 + '+'
  },
  {
    name: '7+/8-',
    uiaa: 'VII+/VIII-',
    sport: 6 + 'c',
    usa: 5.11 + 'b',
    v_grade: 'V' + 2,
    fb: 6 + 'A'
  },
  {
    name: '8-',
    uiaa: 'VIII-',
    sport: 6 + 'c+',
    usa: 5.11 + 'c',
    v_grade: 'V' + 3,
    fb: 6 + 'A+'
  },
  {
    name: '8',
    uiaa: 'VIII',
    sport: 7 + 'a',
    usa: 5.11 + 'd',
    v_grade: 'V' + 3 + '+',
    fb: 6 + 'B'
  },
  {
    name: '8+',
    uiaa: 'VIII+',
    sport: 7 + 'a+',
    usa: 5.12 + 'a',
    v_grade: 'V' + 4,
    fb: 6 + 'B+'
  },
  {
    name: '8+/9-',
    uiaa: 'VIII+/IX-',
    sport: 7 + 'b',
    usa: 5.12 + 'b',
    v_grade: 'V' + 4 + '+',
    fb: 6 + 'C'
  },
  {
    name: '9-',
    uiaa: 'IX-',
    sport: 7 + 'b+',
    usa: 5.12 + 'c',
    v_grade: 'V' + 5,
    fb: 6 + 'C+'
  },
  {
    name: '9',
    uiaa: 'IX',
    sport: 7 + 'c',
    usa: 5.12 + 'd',
    v_grade: 'V' + 6,
    fb: 7 + 'A'
  },
  {
    name: '9+',
    uiaa: 'IX+',
    sport: 7 + 'c+',
    usa: 5.13 + 'a',
    v_grade: 'V' + 7,
    fb: 7 + 'A+'
  },
  {
    name: '9+/10-',
    uiaa: 'IX+/X-',
    sport: 8 + 'a',
    usa: 5.13 + 'b',
    v_grade: 'V' + 7,
    fb: 7 + 'B'
  },
  {
    name: '10-',
    uiaa: 'X-',
    sport: 8 + 'a+',
    usa: 5.13 + 'c',
    v_grade: 'V' + 8,
    fb: 7 + 'B+'
  },
  {
    name: '10',
    uiaa: 'X',
    sport: 8 + 'b',
    usa: 5.13 + 'd',
    v_grade: 'V' + 9,
    fb: 7 + 'C'
  },
  {
    name: '10+',
    uiaa: 'X+',
    sport: 8 + 'b+',
    usa: 5.14 + 'a',
    v_grade: 'V' + 10,
    fb: 7 + 'C+'
  },
  {
    name: '11-',
    uiaa: 'XI-',
    sport: 8 + 'c',
    usa: 5.14 + 'b',
    v_grade: 'V' + 11,
    fb: 8 + 'A'
  },
  {
    name: '11-/11',
    uiaa: 'XI-/XI',
    sport: 9 + 'a',
    usa: 5.14 + 'c',
    v_grade: 'V' + 12,
    fb: 8 + 'A+'
  },
  {
    name: '11',
    uiaa: 'XI',
    sport: 9 + 'a',
    usa: 5.14 + 'd',
    v_grade: 'V' + 13,
    fb: 8 + 'B'
  },
  {
    name: '11+',
    uiaa: 'XI+',
    sport: 9 + 'a+',
    usa: 5.15 + 'a',
    v_grade: 'V' + 14,
    fb: 8 + 'B+'
  },
  {
    name: '12-',
    uiaa: 'XII-',
    sport: 9 + 'b',
    usa: 5.15 + 'b',
    v_grade: 'V' + 15,
    fb: 8 + 'C'
  },
  {
    name: '12',
    uiaa: 'XII',
    sport: 9 + 'b+',
    usa: 5.15 + 'c',
    v_grade: 'V' + 16,
    fb: 8 + 'C+'
  },
  {
    name: '12+',
    uiaa: 'XII+',
    sport: 9 + 'c',
    usa: 5.15 + 'd',
    v_grade: 'V' + 17,
    fb: 9 + 'A'
  }
]

export default gradesData
