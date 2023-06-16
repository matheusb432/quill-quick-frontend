import { ODataOperators, ODataOptions } from '../../types/odata-types';
import { odataUtil } from '../odata-util';
export function runBenchmark(fn: () => void): void {
  const iterations = 1_00_000;
  const startTime = Date.now();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.warn(`Function executed ${iterations} times in ${elapsedTime.toFixed(2)} ms`);
}

//.skip
it('should benchmark', () => {
  // fn: 130ms
  //   runBenchmark(() => odataUtil.query('/books', { filter: { id: 1 } }));
  // fn: 260ms
  //   runBenchmark(() =>
  //     odataUtil.query('/books', {
  //       filter: { name: 'John', age: undefined, lastName: [[ODataOperators.Contains, undefined]] },
  //       orderBy: ['name', 'asc'],
  //     }),
  //   );

  const date = new Date();
  // 310ms
  // 1M - 3100ms
  runBenchmark(() =>
    odataUtil.query('/books', {
      filter: {
        name: 'John',
        age: undefined,
        anotherProp: [
          [ODataOperators.GreaterThanOrEqualTo, 50],
          [ODataOperators.LessThanOrEqualTo, 100],
        ],
        'yetAnotherProp/its/nested': date,
        lastName: [[ODataOperators.Contains, undefined]],
      },
      orderBy: ['name', 'asc'],
    }),
  );

  console.warn(
    odataUtil.query('/books', {
      filter: {
        name: 'John',
        age: undefined,
        anotherProp: [
          [ODataOperators.GreaterThanOrEqualTo, 50],
          [ODataOperators.LessThanOrEqualTo, 100],
        ],
        'yetAnotherProp/its/nested': date,
        lastName: [[ODataOperators.Contains, undefined]],
      },
      orderBy: ['name', 'asc'],
    }),
  );
});
