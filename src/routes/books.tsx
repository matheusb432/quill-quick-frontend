import { useLocation } from '@solidjs/router';
import { Accessor } from 'solid-js';
import { Outlet } from 'solid-start';
import { HIBookOpen } from '~/assets/icons/HIBookOpen';
import { Breadcrumb, Crumb } from '~/components/Breadcrumb';
import { MainContainer } from '~/components/MainContainer';
import { RoutePaths, RouteSubPaths } from '~/core/constants/route-paths';
import { defaultCrumbs } from '~/core/constants/ui-defaults';

export default function BooksLayout() {
  const location = useLocation();
  const crumbs: Accessor<Crumb[]> = () => {
    const hasPath = (path: string) => location.pathname.includes(path);
    return [
      bookCrumb,
      hasPath(RouteSubPaths.Create) && defaultCrumbs.create,
      hasPath(RouteSubPaths.Edit) && defaultCrumbs.edit,
      hasPath(RouteSubPaths.View) && defaultCrumbs.view,
      hasPath(RouteSubPaths.Duplicate) && defaultCrumbs.duplicate,
    ].filter(Boolean) as Crumb[];
  };

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
  iconFn: HIBookOpen,
};
