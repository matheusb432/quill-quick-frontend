import { useLocation } from '@solidjs/router';
import { Accessor } from 'solid-js';
import { Outlet } from 'solid-start';
import { Breadcrumb, Crumb } from '~/components/Breadcrumb';
import { MainContainer } from '~/components/MainContainer';
import { RoutePaths, RouteSubPaths } from '~/core/constants/route-paths';
import { defaultCrumbs } from '~/core/constants/ui-defaults';

export default function BooksLayout() {
  const location = useLocation();
  function crumbs(): Crumb[] {
    const paths = location.pathname.split('/').filter(Boolean);

    const hasPath = (path: string) => paths.includes(path);

    if (hasPath('books') && hasPath('reviews')) {
      return [
        ...bookReviewCrumbs,
        hasPath(RouteSubPaths.Create) && defaultCrumbs.create,
        hasPath(RouteSubPaths.Edit) && defaultCrumbs.edit,
        hasPath(RouteSubPaths.View) && defaultCrumbs.view,
      ].filter((x): x is Crumb => Boolean(x));
    }

    return [
      bookCrumb,
      hasPath(RouteSubPaths.Create) && defaultCrumbs.create,
      hasPath(RouteSubPaths.Edit) && defaultCrumbs.edit,
      hasPath(RouteSubPaths.View) && defaultCrumbs.view,
      hasPath(RouteSubPaths.Duplicate) && defaultCrumbs.duplicate,
    ].filter((x): x is Crumb => Boolean(x));
  }

  return (
    <MainContainer>
      <Breadcrumb crumbs={crumbs()} />
      <Outlet />
    </MainContainer>
  );
}

const bookCrumb: Crumb = {
  label: 'Books',
  path: RoutePaths.Books,
};

const bookReviewCrumbs: Crumb[] = [
  bookCrumb,
  {
    label: 'Book Reviews',
    path: RoutePaths.BookReviews,
  },
];
