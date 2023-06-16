import { ODataOperators } from '../../types/odata-types';
import { odataUtil } from '../odata-util';
export function runBenchmark(fn: () => void): void {
  const iterations = 1_000_000;
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
  const date = new Date();
  // 1M foreach - 4300ms
  // 1M forof - 4300ms
  // 1M forin - 3800ms
  // 1M forin & no recursion - 3650ms
  // 1M forin & no recursion & no undefined - 3600ms
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
      orderBy: [
        [['nested', 'prop', 'test'], 'asc'],
        [['title'], 'asc'],
        [['city', 'date'], 'desc'],
      ],
      count: true,
      skip: 30,
      top: 10,
    }),
  );
});
