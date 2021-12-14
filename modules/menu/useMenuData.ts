import { useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

interface MenuItem {
  icon: string
  name: string
  private?: boolean
}

export default function useMenuData () {
  const { store, app: { i18n } } = useContext()
  const route = useRoute()
  const router = useRouter()

  const items: Record<string, MenuItem> = {
    trnForm: {
      icon: 'mdi mdi-plus',
      name: i18n.t('createTrn')
    },
    index: {
      icon: 'mdi mdi-poll',
      name: i18n.t('stat.shortTitle')
    },
    history: {
      icon: 'mdi mdi-history',
      name: i18n.t('trns.history')
    },
    wallets: {
      icon: 'mdi mdi-credit-card-multiple',
      name: i18n.t('wallets.name')
    },
    categories: {
      icon: 'mdi mdi-folder-star',
      name: i18n.t('categories.name')
    },
    settings: {
      icon: 'mdi mdi-cog-outline',
      name: i18n.t('settings.title')
    },
    users: {
      private: true,
      icon: 'mdi mdi-account-multiple',
      name: i18n.t('users.title')
    },
    groups: {
      private: true,
      icon: 'mdi mdi-folder-multiple-outline',
      name: i18n.t('groups.title')
    }
  }

  function onClick (menuId: string) {
    menuId === 'trnForm'
      ? store.dispatch('trnForm/openTrnForm', { action: 'create' })
      : router.push(menuId)

    if (menuId === 'history')
      router.push(menuId)

    store.dispatch('ui/setActiveTab', null)
  }

  function getClassNames (menuId: string) {
    return ['hocus:bg-neutral-800', { 'border-r-2 bored-neutral-900': route.value.name === menuId }]
  }

  function checkIsShow (item: MenuItem) {
    console.log('item', item)

    return !item.private || (item.private && store.getters['user/isTester'])
  }

  return {
    items,
    onClick,
    getClassNames,
    checkIsShow
  }
}