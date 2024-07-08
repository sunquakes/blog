import { defineConfig } from 'vitepress'
import NavSiderbar from './tools/nav-sidebar'
import fs from 'fs'
import path from 'path'

const navSiderbar = new NavSiderbar({
  entry: './posts',
  collapsed: true,
  ignoreFiles: ['index.md']
})

const sidebar = navSiderbar.getNavDeep('/posts', 'posts')
fs.writeFile('posts' + path.sep + 'index.json', JSON.stringify(sidebar), (err) => {
  if (err) {
    console.error('Error wrote posts list.', err)
  } else {
    console.info('Successfully wrote posts list.')
  }
})

export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: 'Sunquakes',
  description: 'My name is Shing Rui, A full stack developer.',
  themeConfig: {
    logo: '/assets/logo.svg',
    footer: {
      copyright: 'Copyright © 2024-present Shing Rui'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      ...navSiderbar.getNav('/posts'),
      { text: 'About', link: '/about' }
    ],
    sidebar: navSiderbar.getSidebar('/posts'),
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunquakes' }]
  }
})
