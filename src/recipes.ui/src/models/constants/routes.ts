const routes = {
  home: '/home',
  search: '/search',
  add: '/add',
  view: (recipeId: number) => `/recipes/${recipeId}`,
  viewDef: `/recipes/:id`,
  edit: (recipeId: string) => `/recipes/${recipeId}/edit`,
  editDef: `/recipes/:id/edit`,
};

export default routes;
