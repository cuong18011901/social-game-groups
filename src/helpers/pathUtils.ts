import { createBrowserHistory } from 'history'
import { MENUS } from '../constants/paths'

export const getPaths = (pathname: string, exactly?: boolean): MenuPath[] => {
  return MENUS.filter((t) => {
    if (t.path.includes('?') && exactly) return t.path.split('?')[0].replace(/\//g, '') === pathname.replace(/\//g, '')
    else return exactly ? t.path.replace(/\//g, '') === pathname.replace(/\//g, '') : t.path.includes(pathname.trim())
  })
}

export const history = createBrowserHistory()

export const setMenuActive = (_currentPath: string) => {
  const _paths = _currentPath.split('/')
  if (_paths.length > 2) {
    _currentPath = `/${_paths[1]}`
  }

  const _menu = document.getElementById('menu-left')
  if (_menu) {
    const _items = _menu.querySelectorAll('div.item')
    if (_items.length > 0) {
      for (let i = 0; i < _items.length; i++) {
        const _item = _items[i]
        _item.className = _item.className.replace(/active/g, '')
        const _path = _item.getAttribute('data-link')
        if (_path === _currentPath) {
          _item.classList.add('active')
        }
      }
    }
  }
}

/**
 * Get current host like: https://localhost:8000/
 */
export const getCurrentHost = (): string => window.location.protocol.concat('//').concat(window.location.host)
