import { z } from 'zod';

function sizeError(issue: z.ZodTooSmallIssue | z.ZodTooBigIssue, isTooSmall: boolean): string {
  const threshold = isTooSmall
    ? (issue as z.ZodTooSmallIssue).minimum
    : (issue as z.ZodTooBigIssue).maximum;
  const inclusiveText = isTooSmall ? 'at least' : 'at most';

  switch (issue.type) {
    case 'string':
      if (isTooSmall && threshold === 1) return 'Must not be empty';

      return `Must contain ${inclusiveText} ${threshold} character(s)`;
    case 'number':
      if (isTooSmall && threshold === 0) return 'Must be a positive number';

      return `Must be ${isTooSmall ? 'more than' : 'less than'} ${threshold}`;
    default:
      return `Must have ${inclusiveText} ${threshold} item(s)`;
  }
}

const userFriendlyErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type: {
      const types = {
        bigint: 'a number',
        string: 'a text',
        number: 'a number',
        date: 'a date',
        integer: 'a whole number',
        float: 'a decimal number',
      };
      const key = issue.expected as keyof typeof types;
      const type = types[key];
      return { message: `Must be ${type || issue.expected}` };
    }

    case z.ZodIssueCode.too_small: {
      return { message: sizeError(issue, true) };
    }

    case z.ZodIssueCode.too_big: {
      return { message: sizeError(issue, false) };
    }

    case z.ZodIssueCode.invalid_string: {
      const validation = issue.validation;
      return { message: `Invalid format, should be a ${validation}` };
    }

    case z.ZodIssueCode.invalid_enum_value: {
      return { message: 'Invalid choice' };
    }

    case z.ZodIssueCode.not_multiple_of: {
      return { message: `Must be a multiple of ${issue.multipleOf}` };
    }

    case z.ZodIssueCode.unrecognized_keys: {
      return { message: 'Unrecognized key(s)' };
    }

    case z.ZodIssueCode.custom:
    case z.ZodIssueCode.invalid_union: {
      return { message: 'Invalid input' };
    }

    default:
      return { message: ctx.defaultError };
  }
};

export function setZodGlobalErrorMap() {
  z.setErrorMap(userFriendlyErrorMap);
}
