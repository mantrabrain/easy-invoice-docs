import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vitepressLastUpdatedComponent = path.resolve(
  __dirname,
  '../../node_modules/vitepress/dist/client/theme-default/components/VPDocFooterLastUpdated.vue'
)
const customLastUpdatedComponent = path.resolve(
  __dirname,
  './theme/components/VPDocFooterLastUpdated.vue'
)

export default defineConfig({
  title: 'Easy Invoice Documentation',
  description:
    'Official documentation for the Easy Invoice WordPress plugin (Free + Pro) — invoices, quotes, payments, and the Pro feature catalog.',
  lang: 'en-US',

  /** Production: https://easy-invoice.matrixaddons.com/docs/ */
  base: '/docs/',

  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Easy Invoice, WordPress, invoice plugin, billing, quotes, recurring invoices, Stripe, PayPal, MatrixAddons'
      }
    ],
    ['meta', { name: 'author', content: 'MatrixAddons' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#059669' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/logo.svg' }],
    ['link', { rel: 'manifest', href: '/docs/site.webmanifest' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://easy-invoice.matrixaddons.com/docs/' }],
    ['meta', { property: 'og:title', content: 'Easy Invoice Documentation' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Invoices, quotes, recurring billing, payment gateways and Pro features.'
      }
    ],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Easy Invoice Documentation' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'Invoices, quotes, recurring billing, payment gateways and Pro features.'
      }
    ],

    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Easy Invoice Documentation',
        description:
          'Official documentation for the Easy Invoice WordPress plugin (Free + Pro).',
        url: 'https://easy-invoice.matrixaddons.com/docs/'
      })
    ]
  ],

  cleanUrls: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Easy Invoice Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/installation' },
              { text: 'Quick start', link: '/quick-start' },
              { text: 'Your WordPress admin', link: '/admin-dashboard' }
            ]
          },
          {
            text: 'Run the office',
            items: [
              { text: 'Invoices', link: '/invoices' },
              { text: 'Quotes / estimates', link: '/quotes' },
              { text: 'Clients & portal', link: '/clients' },
              { text: 'Payments', link: '/payments' },
              { text: 'Recurring & subscriptions', link: '/recurring-invoices' }
            ]
          },
          {
            text: 'Configure',
            items: [
              { text: 'Payment gateways', link: '/payment-settings' },
              { text: 'Email & notifications', link: '/email-settings' },
              { text: 'Pro features overview', link: '/third-party-integrations' },
              { text: 'All Pro features', link: '/features' }
            ]
          }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'AJAX & webhooks', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      },
      {
        text: 'Easy Invoice Pro',
        link: 'https://matrixaddons.com/plugins/easy-invoice/',
        target: '_blank',
        rel: 'noopener'
      }
    ],

    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick start (setup wizard)', link: '/quick-start' },
          { text: 'Your WordPress admin', link: '/admin-dashboard' }
        ]
      },
      {
        text: 'Run the office',
        collapsed: false,
        items: [
          { text: 'Invoices', link: '/invoices' },
          { text: 'Quotes / estimates', link: '/quotes' },
          { text: 'Clients & portal', link: '/clients' },
          { text: 'Payments', link: '/payments' },
          { text: 'Recurring & subscriptions', link: '/recurring-invoices' }
        ]
      },
      {
        text: 'Configure',
        collapsed: false,
        items: [
          { text: 'Payment gateways', link: '/payment-settings' },
          { text: 'Email & notifications', link: '/email-settings' },
          { text: 'Pro features overview', link: '/third-party-integrations' },
          { text: 'All Pro features', link: '/features' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Shortcodes', link: '/shortcodes' },
          { text: 'Hooks & filters', link: '/hooks-filters' },
          { text: 'AJAX & webhooks', link: '/api-reference' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantrabrain/easy-invoice-docs' }
    ],

    footer: {
      message:
        '© MatrixAddons · GPLv2+ · <a href="https://matrixaddons.com/plugins/easy-invoice/" target="_blank" rel="noopener"><strong>Easy Invoice Pro</strong> — pricing</a>',
      copyright: `Copyright © ${new Date().getFullYear()} MatrixAddons`
    },

    editLink: {
      pattern:
        'https://github.com/mantrabrain/easy-invoice-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated'
    },

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    docFooter: { prev: 'Previous', next: 'Next' },

    markdownSource: {
      pattern:
        'https://raw.githubusercontent.com/mantrabrain/easy-invoice-docs/main/docs/:path'
    }
  },

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  vite: {
    define: { __VUE_OPTIONS_API__: false },
    server: { host: true },
    build: { minify: 'esbuild', chunkSizeWarningLimit: 1000 },
    optimizeDeps: { exclude: ['vitepress'] },
    resolve: {
      alias: {
        [vitepressLastUpdatedComponent]: customLastUpdatedComponent
      }
    }
  },

  ignoreDeadLinks: true,

  sitemap: { hostname: 'https://easy-invoice.matrixaddons.com/docs/' },

  transformHead: ({ pageData }) => {
    const description =
      pageData.frontmatter?.description ||
      'Official documentation for the Easy Invoice WordPress plugin (Free + Pro).'
    const title = pageData.title
      ? `${pageData.title} | Easy Invoice Documentation`
      : 'Easy Invoice Documentation'
    const slug = pageData.relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '')
    const canonical = slug
      ? `https://easy-invoice.matrixaddons.com/docs/${slug}`
      : 'https://easy-invoice.matrixaddons.com/docs/'
    return [
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: canonical }]
    ]
  }
})
