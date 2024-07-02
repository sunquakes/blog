import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

const vitepressSidebarOptions = [
  {
    scanStartPath: 'posts/backend',
    resolvePath: '/posts/backend/',
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true
  },
  {
    scanStartPath: 'posts/frontend',
    resolvePath: '/posts/frontend/',
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true
  },
  {
    scanStartPath: 'about',
    resolvePath: '/about/',
    useTitleFromFileHeading: true
  }
]

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
      { text: 'Backend', link: '/posts/backend/' },
      { text: 'Frontend', link: '/posts/frontend/' },
      { text: 'About', link: '/about' }
    ],

    sidebar: generateSidebar(vitepressSidebarOptions),
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunquakes' }]
  }
})
