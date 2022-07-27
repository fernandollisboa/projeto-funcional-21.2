import { reduce, orderBy, groupBy, compose, distinct } from './index';

const peopleDefault = [
  { id: 1, name: 'John', age: 20 },
  { id: 9, name: 'Luke', age: 21 },
  { id: 4, name: 'John', age: 23 },
  { id: 5, name: 'Luke', age: 25 },
  { id: 8, name: 'Bea', age: 27 },
  { id: 6, name: 'James', age: 25 },
  { id: 3, name: 'mary', age: 20 },
  { id: 7, name: 'Luci', age: 26 },
  { id: 2, name: 'Jane', age: 21 },
  { id: 10, name: 'Bryan', age: 29 },
]

const carsDefault = [
  { id: 1, name: 'Fusca', year: 1980 },
  { id: 8, name: 'Opala', year: 1983 },
  { id: 4, name: 'Brasilia', year: 1987 },
  { id: 5, name: 'Astra', year: 2010 },
  { id: 2, name: 'Fusca', year: 1985 },
  { id: 9, name: 'Santana', year: 1995 },
  { id: 7, name: 'Corolla', year: 2020 },
  { id: 6, name: 'Jetta', year: 2015 },
  { id: 3, name: 'Opala', year: 1990 },
  { id: 10, name: 'Marea', year: 2004 }
]

describe('GroupBy function test.', () => {
  const people = [...peopleDefault];
  const cars = [...carsDefault];

  it('Group the array of people by the age.', () => {
    const groupedPeople = groupBy('age', people);
    console.log(groupedPeople[20]);
    expect(groupedPeople).toEqual({
      20: [{ id: 1, name: 'John', age: 20 }, { id: 3, name: 'mary', age: 20 }],
      21: [{ id: 9, name: 'Luke', age: 21 }, { id: 2, name: 'Jane', age: 21 }],
      23: [{ id: 4, name: 'John', age: 23 }],
      25: [{ id: 5, name: 'Luke', age: 25 }, { id: 6, name: 'James', age: 25 }],
      26: [{ id: 7, name: 'Luci', age: 26 }],
      27: [{ id: 8, name: 'Bea', age: 27 }],
      29: [{ id: 10, name: 'Bryan', age: 29 }],
    });
  })

  it('Group the array of people by the name.', () => {
    const groupedPeople = groupBy('name', people);
    expect(groupedPeople).toEqual({
      John: [{ id: 1, name: 'John', age: 20 }, { id: 4, name: 'John', age: 23 }],
      Jane: [{ id: 2, name: 'Jane', age: 21 }],
      mary: [{ id: 3, name: 'mary', age: 20 }],
      Luke: [{ id: 9, name: 'Luke', age: 21 }, { id: 5, name: 'Luke', age: 25 }],
      James: [{ id: 6, name: 'James', age: 25 }],
      Luci: [{ id: 7, name: 'Luci', age: 26 }],
      Bea: [{ id: 8, name: 'Bea', age: 27 }],
      Bryan: [{ id: 10, name: 'Bryan', age: 29 }],
    });
  })

  it('Group the array fo cars by the name.', () => {
    const groupedCars = groupBy('name', cars);
    expect(groupedCars).toEqual({
      Brasilia: [{ id: 4, name: 'Brasilia', year: 1987 }],
      Fusca: [{ id: 1, name: 'Fusca', year: 1980 }, { id: 2, name: 'Fusca', year: 1985 }],
      Opala: [{ id: 8, name: 'Opala', year: 1983 }, { id: 3, name: 'Opala', year: 1990 }],
      Santana: [{ id: 9, name: 'Santana', year: 1995 }],
      Marea: [{ id: 10, name: 'Marea', year: 2004 }],
      Astra: [{ id: 5, name: 'Astra', year: 2010 }],
      Jetta: [{ id: 6, name: 'Jetta', year: 2015 }],
      Corolla: [{ id: 7, name: 'Corolla', year: 2020 }],
    });
  })
})

describe('Distinct function test.', () => {
  const people = [...peopleDefault];
  const cars = [...carsDefault]

  it('Distinct people by the name.', () => {
    const distinctPeople = distinct('name', people);
    expect(distinctPeople).toEqual([
      { id: 8, name: 'Bea', age: 27 },
      { id: 6, name: 'James', age: 25 },
      { id: 3, name: 'mary', age: 20 },
      { id: 7, name: 'Luci', age: 26 },
      { id: 2, name: 'Jane', age: 21 },
      { id: 10, name: 'Bryan', age: 29 },
    ]);
  })
  
  it('Distinct people by the age.', () => {
    const distinctAges = distinct('age', people)
    expect(distinctAges).toEqual([
      { id: 4, name: 'John', age: 23 },
      { id: 7, name: 'Luci', age: 26 },
      { id: 8, name: 'Bea', age: 27 },
      { id: 10, name: 'Bryan', age: 29 },
    ])
  })

  it('Distinct cars by the name.', () => {
    const distinctCarsName = distinct('name', cars);
    expect(distinctCarsName).toEqual([
      { id: 4, name: 'Brasilia', year: 1987 },
      { id: 5, name: 'Astra', year: 2010 },
      { id: 9, name: 'Santana', year: 1995 },
      { id: 7, name: 'Corolla', year: 2020 },
      { id: 6, name: 'Jetta', year: 2015 },
      { id: 10, name: 'Marea', year: 2004 }
    ])
  })
})

describe('OrderBy function test.', () => {
  const cars = [...carsDefault];
  const people = [...peopleDefault];

  it('Sort the array of people by the age.', () => {
    const orderedPeople = orderBy('age', people);
    expect(orderedPeople).toEqual([
      { id: 1, name: 'John', age: 20 },
      { id: 3, name: 'mary', age: 20 },
      { id: 9, name: 'Luke', age: 21 },
      { id: 2, name: 'Jane', age: 21 },
      { id: 4, name: 'John', age: 23 },
      { id: 5, name: 'Luke', age: 25 },
      { id: 6, name: 'James', age: 25 },
      { id: 7, name: 'Luci', age: 26 },
      { id: 8, name: 'Bea', age: 27 },
      { id: 10, name: 'Bryan', age: 29 },
    ]);
  })

  it('Sort the array of people by the id.', () => {
    const orderedPeople = orderBy('id', people);
    expect(orderedPeople).toEqual([
      { id: 1, name: 'John', age: 20 },
      { id: 2, name: 'Jane', age: 21 },
      { id: 3, name: 'mary', age: 20 },
      { id: 4, name: 'John', age: 23 },
      { id: 5, name: 'Luke', age: 25 },
      { id: 6, name: 'James', age: 25 },
      { id: 7, name: 'Luci', age: 26 },
      { id: 8, name: 'Bea', age: 27 },
      { id: 9, name: 'Luke', age: 21 },
      { id: 10, name: 'Bryan', age: 29 },
    ]);
  })

  it('Sort the array of cars by the releases years', () => {
    const orderedCars = orderBy('year', cars);
    expect(orderedCars).toEqual([
      { id: 1, name: 'Fusca', year: 1980 },
      { id: 8, name: 'Opala', year: 1983 },
      { id: 2, name: 'Fusca', year: 1985 },
      { id: 4, name: 'Brasilia', year: 1987 },
      { id: 3, name: 'Opala', year: 1990 },
      { id: 9, name: 'Santana', year: 1995 },
      { id: 10, name: 'Marea', year: 2004 },
      { id: 5, name: 'Astra', year: 2010 },
      { id: 6, name: 'Jetta', year: 2015 },
      { id: 7, name: 'Corolla', year: 2020 },
    ]);
  })
})

describe('Reduce function test.', () => {
  const cars = [...carsDefault];
  const people = [...peopleDefault];

  it('Reduce the array of people to the sum of all ages.', () => {
    const sumOfAges = reduce((acc, curr) => acc + curr.age, 0, people);
    expect(sumOfAges).toBe(237);
  })

  it('Reduce the array of people to the number of all ages less than 25 years.', () => {
    const sumOfReleasesBefore1990 = reduce((acc, curr) => acc + (curr.age < 25 ? 1 : 0), 0, people);
    expect(sumOfReleasesBefore1990).toBe(5);
  })

  it('Reduce the array of cars to the sum of all releases years.', () => {
    const sumOfYears = reduce((acc, curr) => acc + curr.year, 0, cars);
    expect(sumOfYears).toBe(19969);
  })

  it('Reduce the array of cars to the number of all releases occurred before 1990.', () => {
    const sumOfReleasesBefore1990 = reduce((acc, curr) => acc + (curr.year < 1990 ? 1 : 0), 0, cars);
    expect(sumOfReleasesBefore1990).toBe(4);
  })
})

describe('Compose function test.', () => {
  const fn1 = (x: number) => x + x;
  const fn2 = (x: number) => x / 2;
  const fn3 = (x: number) => x * 3;
  const fn4 = (x: number) => x - 4;

  it('Compose two functions.', () => {
    const composed = compose(fn1, fn2)
    expect(composed(2)).toBe(2);
  })

  it('Compose tree functions.', () => {
    const composed = compose(fn1, fn2, fn3)
    expect(composed(2)).toBe(6);
  })

  it('Compose four functions.', () => {
    const composed = compose(fn1, fn2, fn3, fn4)
    expect(composed(2)).toBe(-6);
  })
})