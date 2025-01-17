<script lang="ts">
import useFilter from '~/modules/filter/useFilter'

export default {
  name: 'StatItemRound',

  props: {
    category: {
      type: Object,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },

  setup (props) {
    const { categoryId, type } = toRefs(props)
    const { $store } = useNuxtApp()
    const { setCategoryFilter } = useFilter()

    const trnsIds = computed(() => {
      return $store.getters['trns/getTrns']({
        categoryId: categoryId.value,
        type: type.value
      })
    })

    const isCategoryHasChildren = computed(() => $store.getters['categories/isCategoryHasChildren'](categoryId.value))
    const filterPeriod = computed(() => $store.state.filter.period)
    const statCurrentPeriod = computed(() => $store.getters['stat/statCurrentPeriod'])

    // long press
    const item = ref(document.createElement('div'))

    return {
      setCategoryFilter,
      trnsIds,
      filterPeriod,
      statCurrentPeriod,
      item,
      isCategoryHasChildren
    }
  }
}
</script>

<template lang="pug">
.statItemRound(
  v-if="category"
  :class="{ _prevStat: total === 0 }"
  ref="item"
  data-long-press-delay="300"
  @click="setCategoryFilter(categoryId)"
)
  .statItemRound__icon
    .text-neutral-50.text-xl.leading-none.w-8.h-8.rounded-full.justify-center.items-center.flex(
      :style="{ background: category.color }"
      @click.stop="setCategoryFilter(categoryId)"
    ): div(:class="category.icon")

  .statItemRound__name.js-getWidth(:class="{ _isCategoryHasChildren: isCategoryHasChildren }") {{ category.name }}{{ isCategoryHasChildren ? '...' : '' }}
  .statItemRound__amount.js-getWidth
    Amount(
      :currency="currency"
      :isColorize="false"
      :type="type"
      :value="total"
      size="md"
    )
</template>

<style lang="stylus">
.statItemRound
  &__icon
    .icon
      width 36px !important
      height 36px !important
      background var(--c-bg-4) !important

      .icon__image
        font-size 22px
</style>
<style lang="stylus" scoped>
.statItemRound
  cursor pointer
  position relative
  display flex
  align-items center
  justify-content center
  flex-flow column
  padding $m6
  border 1px solid transparent
  border-radius $m5
  +media-hover()
    background var(--c-item2-bg-hover)

  &._prevStat
    opacity .5

  &._active
    margin-bottom $m9

  &__name
    padding 6px 0 2px 0
    color var(--c-font-4)
    font-size 12px
    text-align center

    ^[0]._active &
      color var(--c-font-2)
      font-weight 500

    &._isCategoryHasChildren
      margin-right -8px
</style>
