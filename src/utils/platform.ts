// @ts-ignore
import Cookies from 'js-cookie'


export const getDarkMode = () => Cookies.get('colorScheme') == 'dark'