import { HIDocumentCopy } from '~/assets/icons/HIDocumentCopy';
import { HIDocumentMagnifyingGlass } from '~/assets/icons/HIDocumentMagnifyingGlass';
import { HIPencilSquare } from '~/assets/icons/HIPencilSquare';
import { HIPlus } from '~/assets/icons/HIPlus';
import { RouteSubPaths } from './route-paths';

export enum ToastDefaults {
  DurationMs = 5000,
  TransitionDurationMs = 500,
}

export const defaultCrumbs = {
  create: {
    label: 'Create',
    path: RouteSubPaths.Create,
    iconFn: HIPlus,
  },
  edit: {
    label: 'Edit',
    path: RouteSubPaths.Edit,
    iconFn: HIPencilSquare,
  },
  view: {
    label: 'View',
    path: RouteSubPaths.View,
    iconFn: HIDocumentMagnifyingGlass,
  },
  duplicate: {
    label: 'Duplicate',
    path: RouteSubPaths.Duplicate,
    iconFn: HIDocumentCopy,
  },
};
