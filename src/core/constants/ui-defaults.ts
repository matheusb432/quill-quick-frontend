import { RouteSubPaths } from './route-paths';

export enum ToastDefaults {
  DurationMs = 5000,
  TransitionDurationMs = 500,
}

export const defaultCrumbs = {
  create: {
    label: 'Create',
    path: RouteSubPaths.Create,
  },
  edit: {
    label: 'Edit',
    path: RouteSubPaths.Edit,
  },
  view: {
    label: 'View',
    path: RouteSubPaths.View,
  },
  duplicate: {
    label: 'Duplicate',
    path: RouteSubPaths.Duplicate,
  },
};
