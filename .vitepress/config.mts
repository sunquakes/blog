import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

const vitepressSidebarOptions = [
  {
    scanStartPath: 'posts/linux',
    resolvePath: '/posts/linux/',
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true
  },
  {
    scanStartPath: 'about',
    resolvePath: '/about/',
    useTitleFromFileHeading: true
  }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: 'Sunquakes',
  description: 'My name is Shing Rui, A full stack developer.',
  themeConfig: {
    logo: '/assets/logo.svg',
    footer: {
      copyright: 'Copyright © 2024-present Shing Rui'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Linux', link: '/posts/linux/install_nfs' },
      { text: 'About', link: '/about' }
    ],

    sidebar: generateSidebar(vitepressSidebarOptions),
    socialLinks: [{ icon: 'github', link: 'https://github.com/sunquakes' }]
  }
})
