const routes = {
  home: '/tabs/recipes',
  search: '/search',
  add: '/tabs/add',
  view: (recipeId: number) => `/tabs/recipes/${recipeId}`,
  viewDef: `/tabs/recipes/:id`,
  edit: (recipeId: string) => `/tabs/recipes/${recipeId}/edit`,
  editDef: `/tabs/recipes/:id/edit`,
};

export default routes;
