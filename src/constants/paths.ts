const PATH = {
  Home: "/home",
};

const MENUS: MenuPath[] = [
  {
    code: "DASHBOARD",
    title: "MENUS_DASHBOARD",
    path: "/",
    showMenu: true,
    showPath: true,
  },
];

const getPathFromMenu = (menus: MenuPath[]): any => {
  const pathRoutes = {} as any;
  menus
    .filter((t) => t.showPath)
    .forEach((t) => {
      pathRoutes[t.code] = t.path;
    });
  return pathRoutes;
};

/**
 * CONSTANT WITH DEFAULT: not-found only
 */
const AUTH = {} as any;
// set feault ROUTE for first loading
// it not need to be role defined
MENUS.filter((t) => t.showPath && t.isAlway).forEach((t) => {
  AUTH[t.code] = t.path;
});

const pathIsExisted = (_menus: MenuPath[]): boolean => {
  let _paths = window.location.pathname.split("/");
  let _path = _paths[0];
  if (_paths.length > 1) _path = _paths[1];
  return _menus.some((t) => t.path.includes(_path) && t.showPath);
};
export { PATH, MENUS, AUTH, getPathFromMenu, pathIsExisted };
