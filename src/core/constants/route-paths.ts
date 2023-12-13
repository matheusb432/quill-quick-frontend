export enum RoutePaths {
  Home = '/',
  Books = '/books',
  BookCreate = '/books/create',
  BookDetail = '/books/:id/:mode',
  BookReviews = '/books/reviews',
  BookReviewCreate = '/books/:id/create-review',
  BookReviewDetail = '/books/reviews/:id/:mode',
  NotFound = '/404',
}

export enum RouteSubPaths {
  Create = 'create',
  Edit = 'edit',
  View = 'view',
  Details = 'details',
  Duplicate = 'duplicate',
}
